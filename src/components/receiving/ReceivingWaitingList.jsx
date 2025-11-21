import { Package, Calendar, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ReceivingWaitingList = ({ waitingData, onAddReceiving, onReceive, onDelete, isLoading = false }) => {
  const [receivingInputs, setReceivingInputs] = useState({});

  const handleInputChange = (id, field, value) => {
    setReceivingInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleReceive = (item) => {
    const inputs = receivingInputs[item.id] || {};
    const receivedQuantity = inputs.receivedQuantity || '';
    const unitCount = inputs.unitCount || '1'; // 기본값 1

    if (!receivedQuantity) {
      alert('입고량을 입력해주세요.');
      return;
    }

    onReceive({
      ...item,
      receivedQuantity,
      unitCount,
    });

    // 입력값 초기화
    setReceivingInputs((prev) => ({
      ...prev,
      [item.id]: { receivedQuantity: '', unitCount: '' },
    }));
  };

  return (
    <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
      {/* 헤더 */}
      <div className='border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Package className='h-5 w-5 text-[#674529]' />
            <h3 className='text-base text-[#674529]'>
              입고 대기 목록 ({waitingData.length}건)
            </h3>
          </div>
          <button
            onClick={onAddReceiving}
            className='rounded-xl border border-[#674529] bg-white px-4 py-2 text-sm font-medium text-[#674529] transition-colors hover:bg-gray-50'
          >
            입고 목록 추가
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full table-fixed'>
          <colgroup>
            <col className='w-[10%]' />
            <col className='w-[25%]' />
            <col className='w-[13%]' />
            <col className='w-[13%]' />
            <col className='w-[13%]' />
            <col className='w-[13%]' />
            <col className='w-[19%]' />
          </colgroup>
          <thead>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                품목코드
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                품목명
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                주문량
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                입고량
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                묶음 수
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                입고예정일
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='px-4 py-8 text-center text-sm text-gray-500'>
                  로딩 중...
                </td>
              </tr>
            ) : waitingData.length === 0 ? (
              <tr>
                <td colSpan={7} className='px-4 py-8 text-center text-sm text-gray-500'>
                  입고 대기 목록이 없습니다.
                </td>
              </tr>
            ) : (
              waitingData.map((item) => (
              <tr key={item.id}>
                <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                  {item.itemCode}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>
                  {item.itemName}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.expectedQuantity || item.quantity} {item.unit || ''}
                </td>
                <td className='px-4 py-4'>
                  <input
                    type='number'
                    placeholder='10'
                    value={receivingInputs[item.id]?.receivedQuantity || ''}
                    onChange={(e) =>
                      handleInputChange(item.id, 'receivedQuantity', e.target.value)
                    }
                    className='w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                  />
                </td>
                <td className='px-4 py-4'>
                  <input
                    type='number'
                    placeholder='1'
                    value={receivingInputs[item.id]?.unitCount ?? ''}
                    onChange={(e) =>
                      handleInputChange(item.id, 'unitCount', e.target.value)
                    }
                    className='w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                  />
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center space-x-1 text-sm text-gray-700'>
                    <Calendar className='h-4 w-4 text-gray-500' />
                    <span>{item.expectedDate || item.scheduledDate || item.scheduled_date}</span>
                  </div>
                </td>
                <td className='flex gap-1 justify-start items-center px-4 py-4'>
                  <button
                    onClick={() => handleReceive(item)}
                    className='rounded-xl bg-[#674529] hover:bg-[#553821] px-4 py-2 text-sm font-medium text-white transition-colors'
                  >
                    입고
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className='rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600'
                    title='삭제'
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceivingWaitingList;
