import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkOrders, fetchFactory2Orders } from '../../store/modules/manufacturing/action';
import { selectWorkOrders, selectWorkOrdersLoading } from '../../store/modules/manufacturing/selectors';
import Pagination from '../common/Pagination';
import StatusSummaryBar from './StatusSummaryBar';

const WorkOrderListView = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState('전체');
  const [factoryFilter, setFactoryFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Redux에서 작업 지시서 목록 가져오기
  const workOrdersFromRedux = useSelector(selectWorkOrders);
  const factory2OrdersFromRedux = useSelector(state => state.manufacturing.factory2Orders.data);
  const loading = useSelector(selectWorkOrdersLoading);

  // 컴포넌트 마운트 시 작업 지시서 목록 조회
  useEffect(() => {
    dispatch(fetchWorkOrders.request());
    dispatch(fetchFactory2Orders.request());
  }, [dispatch]);

  // 1공장과 2공장 데이터 합치기
  const allOrders = [
    ...(workOrdersFromRedux || []),
    ...(factory2OrdersFromRedux || [])
  ];

  // 공장별 필터링
  const filteredOrders = factoryFilter === '전체' 
    ? allOrders 
    : factoryFilter === '1공장'
    ? allOrders.filter(order => order.factoryId === 1)
    : allOrders.filter(order => order.factoryId === 2);

  // 상태별 개수 계산
  const statusCounts = {
    inProgress: filteredOrders.filter(order => order.status === 'in_progress').length,
    waiting: filteredOrders.filter(order => order.status === 'waiting').length,
    completed: filteredOrders.filter(order => order.status === 'completed').length,
    total: filteredOrders.length
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const workOrders = filteredOrders.slice(startIndex, endIndex);

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [factoryFilter, filterType]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <StatusSummaryBar 
        title="작업 지시서 관리"
        inProgressCount={statusCounts.inProgress}
        waitingCount={statusCounts.waiting}
        completedCount={statusCounts.completed}
        workerCount={3}
      />

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#674529]">작업 지시서 목록</h3>
        <div className="flex items-center gap-4">
          {loading && (
            <span className="text-sm text-gray-500">로딩 중...</span>
          )}
          <select
            value={factoryFilter}
            onChange={(e) => setFactoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
          >
            <option value="전체">전체</option>
            <option value="1공장">1공장</option>
            <option value="2공장">2공장</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
          >
            <option value="전체">전체</option>
            <option value="내 작업">내 작업</option>
          </select>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        전체 {filteredOrders.length}개 중 {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)}개 표시
      </div>

      <div className="space-y-4">
        {workOrders.length === 0 && !loading ? (
          <div className="text-center py-8 text-gray-500">
            작업 지시서가 없습니다.
          </div>
        ) : (
          workOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">{order.title}</h4>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.factoryId === 1 ? '1공장' : order.factoryId === 2 ? '2공장' : ''}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">작업자:</span> {order.worker || order.manager || '-'}
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
              </div>

              <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm">
                <div className="justify-between">
                  <span className="text-gray-600">원재료코드</span>
                  <p className="text-gray-900 font-medium">{order.materialCode || order.orderCode || '-'}</p>
                </div>
                <div className="justify-between">
                  <span className="text-gray-600">원재료명</span>
                  <p className="text-gray-900 font-medium">{order.material || '-'}</p>
                </div>
                <div className="justify-between">
                  <span className="text-gray-600">필요량</span>
                  <p className="text-gray-900 font-medium">{order.quantity}</p>
                </div>
                <div className="justify-between">
                  <span className="text-gray-600">작업예정일</span>
                  <p className="text-gray-900 font-medium">{order.deadlineDate || order.deadline || '-'}</p>
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
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default WorkOrderListView;
