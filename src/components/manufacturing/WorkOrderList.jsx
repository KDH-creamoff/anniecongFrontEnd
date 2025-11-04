import { useState } from 'react';

const WorkOrderList = () => {
  const [filterType, setFilterType] = useState('전체');

  const workOrders = [
    {
      id: 'RAW001',
      title: 'Title',
      product: '전처리 믹스 A - 10개',
      material: '닭고기 (가슴살)',
      quantity: '50 kg',
      deadlineDate: '2025-10-22',
      manager: '김전처리',
    },
    {
      id: 'RAW002',
      title: 'Title',
      product: '세척',
      material: '당근',
      quantity: '100 kg',
      deadlineDate: '2025-10-23',
      manager: '나작업',
    },
  ];

  return (
    <div>
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-[#674529]">작업 지시서 목록</h3>
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
          {workOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">{order.title}</h4>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">작업자: {order.manager}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm">
                <div className="justify-between">
                  <span className="text-gray-600">원재료코드</span>
                  <p className="text-gray-900 font-medium">{order.id}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderList;
