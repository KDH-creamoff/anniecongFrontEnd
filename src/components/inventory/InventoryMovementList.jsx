import React from 'react';
import { Clock } from 'lucide-react';

const InventoryMovementList = () => {
  const movements = [
    {
      time: '2025-09-09 08:30',
      type: '입고',
      category: '닭고기 (가슴살)',
      code: 'RAW001',
      lotNumber: 'LOT20250909001',
      quantity: '+300 kg',
      fromLocation: '프리미엄 육류',
      toLocation: 'P1-RM',
      manager: '김영수',
      note: '입고검수 완료',
    },
    {
      time: '2025-09-10 14:15',
      type: '소모',
      category: '닭고기 (가슴살)',
      code: 'RAW001',
      lotNumber: 'LOT20250909001',
      quantity: '-50 kg',
      fromLocation: 'P1-RM',
      toLocation: 'WO001',
      manager: '이진채리',
      note: '전처리 공정 투입',
    },
    {
      time: '2025-09-10 16:45',
      type: '생산',
      category: '전처리 믹스 A',
      code: 'WIP001',
      lotNumber: 'LOT20250910002',
      quantity: '+150 kg',
      fromLocation: 'WO001',
      toLocation: 'P2-WIP',
      manager: '이진채리',
      note: '전처리 완료 산출',
    },
    {
      time: '2025-09-11 09:20',
      type: '이동',
      category: '전처리 믹스 A',
      code: 'WIP001',
      lotNumber: 'LOT20250910002',
      quantity: '-150 kg',
      fromLocation: 'P2-WIP',
      toLocation: 'MO001',
      manager: '최제조',
      note: '제조공정 투입',
    },
    {
      time: '2025-09-11 15:30',
      type: '생산',
      category: '애너골 펫메이커리 A',
      code: 'FG001',
      lotNumber: 'LOT20250911005',
      quantity: '+650 ea',
      fromLocation: 'MO001',
      toLocation: 'P2-FG',
      manager: '최제조',
      note: '제조 완료',
    },
  ];

  const getTypeStyle = (type) => {
    switch (type) {
      case '입고':
        return 'bg-blue-50 text-blue-600';
      case '소모':
        return 'bg-red-50 text-red-600';
      case '생산':
        return 'bg-green-50 text-green-600';
      case '이동':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getQuantityColor = (quantity) => {
    if (quantity.startsWith('+')) return 'text-green-600';
    if (quantity.startsWith('-')) return 'text-red-600';
    return 'text-gray-900';
  };

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Clock className='h-5 w-5 text-[#674529]' />
        <h2 className='text-lg text-[#674529]'>재고 이동 이력</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                시간
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                유형
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                품목
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                바코드번호
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                수량
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                출발지
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                도착지
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                담당자
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                비고
              </th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              <tr
                key={index}
                className='border-b border-gray-100 hover:bg-gray-50'
              >
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {movement.time}
                </td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getTypeStyle(movement.type)}`}
                  >
                    {movement.type}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <div className='text-sm text-gray-900'>
                    {movement.category}
                  </div>
                  <div className='text-xs text-gray-500'>{movement.code}</div>
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {movement.lotNumber}
                </td>
                <td className='px-4 py-4'>
                  <span
                    className={`text-sm font-semibold ${getQuantityColor(movement.quantity)}`}
                  >
                    {movement.quantity}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {movement.fromLocation}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {movement.toLocation}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {movement.manager}
                </td>
                <td className='px-4 py-4 text-sm text-gray-500'>
                  {movement.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryMovementList;
