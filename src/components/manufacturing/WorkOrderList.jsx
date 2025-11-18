import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkOrders, updateWorkOrderStatus } from '../../store/modules/manufacturing/action';
import { selectWorkOrders, selectWorkOrdersLoading } from '../../store/modules/manufacturing/selectors';
import Pagination from '../common/Pagination';
import StatusSummaryBar from './StatusSummaryBar';

const WorkOrderList = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completionData, setCompletionData] = useState({
    damage: '',
    temperature: '',
    duration: '',
    note: ''
  });

  // Redux에서 작업 지시서 목록 가져오기
  const workOrdersFromRedux = useSelector(selectWorkOrders);
  const loading = useSelector(selectWorkOrdersLoading);

  // 컴포넌트 마운트 시 작업 지시서 목록 조회
  useEffect(() => {
    dispatch(fetchWorkOrders.request());
  }, [dispatch]);

  // 1공장 데이터만 필터링
  const factory1Orders = (workOrdersFromRedux || []).filter(order => order.factoryId === 1);

  // 상태별 개수 계산
  const statusCounts = {
    inProgress: factory1Orders.filter(order => order.status === 'in_progress').length,
    waiting: factory1Orders.filter(order => order.status === 'waiting').length,
    completed: factory1Orders.filter(order => order.status === 'completed').length,
    total: factory1Orders.length
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(factory1Orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const workOrders = factory1Orders.slice(startIndex, endIndex);

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  // 시작 버튼 핸들러
  const handleStart = (orderId) => {
    console.log('작업 시작:', orderId);
    // 상태를 진행중으로 변경 (작업자는 이미 등록된 담당자 유지)
    dispatch(updateWorkOrderStatus.request({ 
      id: orderId, 
      status: 'in_progress'
    }));
  };

  // 완료 버튼 핸들러
  const handleComplete = (order) => {
    setSelectedOrder(order);
    setShowCompletionModal(true);
  };

  // 완료 폼 제출
  const handleSubmitCompletion = () => {
    if (!completionData.damage || !completionData.duration) {
      alert('파손량, 소요시간은 필수 입력 항목입니다.');
      return;
    }

    const completedQuantity = selectedOrder.quantity - parseInt(completionData.damage);
    console.log('작업 완료:', {
      orderId: selectedOrder.id,
      completedQuantity,
      ...completionData
    });

    // TODO: 완료 액션 디스패치

    // 모달 닫기 및 초기화
    setShowCompletionModal(false);
    setSelectedOrder(null);
    setCompletionData({
      damage: '',
      temperature: '',
      duration: '',
      note: ''
    });
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowCompletionModal(false);
    setSelectedOrder(null);
    setCompletionData({
      damage: '',
      temperature: '',
      duration: '',
      note: ''
    });
  };

  return (
    <>
    <div>
      <div className="mx-auto">
        <StatusSummaryBar 
          title="1공장 전처리 공정"
          inProgressCount={statusCounts.inProgress}
          waitingCount={statusCounts.waiting}
          completedCount={statusCounts.completed}
          workerCount={3}
        />

        <h3 className="text-lg font-semibold text-[#674529] mb-4">작업 지시서 목록</h3>

        <div className="mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
          >
            <option value="전체">전체</option>
            <option value="내 작업">내 작업</option>
          </select>
        </div>

        <div className="space-y-6">
          {workOrders.length === 0 && !loading ? (
            <div className="text-center py-8 text-gray-500">
              작업 지시서가 없습니다.
            </div>
          ) : (
            workOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{order.title}</h4>
                    <p className="text-sm text-gray-600">{order.product}</p>
                  </div>
                                      <div className="text-right space-y-2">
                        <div className="flex space-x-4">
                            <p className="text-sm text-gray-700">
                                <span className="text-gray-500">작업자:</span> {order.worker || ''}
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-500">현재 상태:</span>{' '}
                                <span className={`font-medium ${
                                    order.status === 'waiting' ? 'text-blue-600' :
                                    order.status === 'in_progress' ? 'text-orange-600' :
                                    'text-green-600'
                                }`}>
                                    {order.status === 'waiting' ? '대기' : order.status === 'in_progress' ? '진행중' : '완료'}
                                </span>
                            </p>
                        </div>
                        {order.status === 'waiting' && (
                            <button
                              onClick={() => handleStart(order.id)}
                              className="w-[100px] px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                                시작
                            </button>
                        )}
                        {order.status === 'in_progress' && (
                            <button
                              onClick={() => handleComplete(order)}
                              className="w-[100px] px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                                완료
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm">
                  <div className="justify-between">
                    <span className="text-gray-600">원재료코드</span>
                    <p className="text-gray-900 font-medium">{order.materialCode}</p>
                  </div>
                  <div className="justify-between">
                    <span className="text-gray-600">원재료명</span>
                    <p className="text-gray-900 font-medium">{order.material}</p>
                  </div>
                  <div className="justify-between">
                    <span className="text-gray-600">필요량</span>
                    <p className="text-gray-900 font-medium">{order.quantity}</p>
                  </div>
                  <div className="justify-between">
                    <span className="text-gray-600">작업예정일</span>
                    <p className="text-gray-900 font-medium">{order.deadlineDate}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={factory1Orders.length}
        itemsPerPage={itemsPerPage}
      />
      </div>
    </div>

    {/* 작업 완료 모달 */}
    {showCompletionModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-[#674529]">작업 완료</h3>
                    <button
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">작업명: <span className="font-medium text-gray-900">{selectedOrder.title}</span></p>
                    <p className="text-sm text-gray-600 mb-1">제품명: <span className="font-medium text-gray-900">{selectedOrder.product}</span></p>
                    <p className="text-sm text-gray-600">작업량: <span className="font-medium text-gray-900">{selectedOrder.quantity}</span></p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            파손량 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                value={completionData.damage}
                                onChange={(e) => setCompletionData({ ...completionData, damage: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                            <span className="text-sm text-gray-600">kg</span>
                        </div>
                        {completionData.damage && (
                            <p className="mt-1 text-xs text-gray-500">
                                완료된 수량: {parseFloat(selectedOrder.quantity) - parseFloat(completionData.damage || 0)}kg
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            온도
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={completionData.temperature}
                                onChange={(e) => setCompletionData({ ...completionData, temperature: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="20"
                            />
                            <span className="text-sm text-gray-600">°C</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            소요 시간 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                value={completionData.duration}
                                onChange={(e) => setCompletionData({ ...completionData, duration: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="60"
                            />
                            <span className="text-sm text-gray-600">분</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            비고
                        </label>
                        <textarea
                            value={completionData.note}
                            onChange={(e) => setCompletionData({ ...completionData, note: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="3"
                            placeholder="특이사항을 입력하세요"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleCloseModal}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmitCompletion}
                        className="flex-1 px-4 py-2 bg-[#674529] text-white rounded hover:bg-[#553821] transition-colors"
                    >
                        완료 처리
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default WorkOrderList;
