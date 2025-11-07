import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFactory2Orders } from "../../store/modules/manufacturing/action";
import { selectFactory2Orders, selectFactory2OrdersLoading } from "../../store/modules/manufacturing/selectors";

const Factory2OrderList = () => {
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState('전체');

    // Redux에서 2공장 주문 목록 가져오기
    const factory2OrdersFromRedux = useSelector(selectFactory2Orders);
    const loading = useSelector(selectFactory2OrdersLoading);

    // 컴포넌트 마운트 시 2공장 주문 목록 조회
    useEffect(() => {
        dispatch(fetchFactory2Orders.request());
    }, [dispatch]);

    const workOrders = factory2OrdersFromRedux || [];

    return (
    <div>
        <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#674529]">제조 지시서 목록</h3>
            {loading && (
                <span className="text-sm text-gray-500">로딩 중...</span>
            )}
        </div>

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
                    제조 지시서가 없습니다.
                </div>
            ) : (
                workOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-1">{order.product}</h4>
                        <p className="text-sm text-gray-600">주문코드: {order.orderCode}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">상태: {order.status === 'waiting' ? '대기' : order.status === 'in_progress' ? '진행중' : '완료'}</p>
                    </div>
                    </div>

                    <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm">
                    <div className="justify-between">
                        <span className="text-gray-600">제품명</span>
                        <p className="text-gray-900 font-medium">{order.product}</p>
                    </div>
                    <div className="justify-between">
                        <span className="text-gray-600">수량</span>
                        <p className="text-gray-900 font-medium">{order.quantity}</p>
                    </div>
                    <div className="justify-between">
                        <span className="text-gray-600">주문일</span>
                        <p className="text-gray-900 font-medium">{order.orderDate}</p>
                    </div>
                    <div className="justify-between">
                        <span className="text-gray-600">마감일</span>
                        <p className="text-gray-900 font-medium">{order.deadline}</p>
                    </div>
                    </div>
                </div>
                ))
            )}
        </div>
    </div>
    </div>
    );
}

export default Factory2OrderList;