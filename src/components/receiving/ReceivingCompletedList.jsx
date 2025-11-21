import { CheckCircle2, Printer, X } from 'lucide-react';

const ReceivingCompletedList = ({ completedData, onCancel, onLabelPrint, isLoading = false }) => {

  return (
    <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
      {/* 헤더 */}
      <div className='border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center space-x-2'>
          <CheckCircle2 className='h-5 w-5 text-[#674529]' />
          <h3 className='text-base text-[#674529]'>
            입고 완료 목록 ({completedData.length}건)
          </h3>
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
                입고완료일
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='px-4 py-8 text-center text-sm text-gray-500'>
                  로딩 중...
                </td>
              </tr>
            ) : completedData.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-4 py-8 text-center text-sm text-gray-500'>
                  입고 완료 목록이 없습니다.
                </td>
              </tr>
            ) : (
              completedData.map((item) => (
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
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {typeof item.receivedQuantity === 'string' 
                    ? item.receivedQuantity 
                    : `${item.receivedQuantity || item.actualQuantity || item.quantity || 0} ${item.unit || ''}`}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.unitCount}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.completedDate}
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center justify-start space-x-2'>
                    <button
                      onClick={() => onCancel(item.id)}
                      className='flex items-center space-x-1 rounded-xl bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100'
                    >
                      <X className='h-4 w-4' />
                      <span>입고 취소</span>
                    </button>
                    <button
                      onClick={() => onLabelPrint(item)}
                      className='flex items-center space-x-1 rounded-xl bg-[#674529] hover:bg-[#553821] px-3 py-1.5 text-sm font-medium text-white transition-colors'
                    >
                      <Printer className='h-4 w-4 ' />
                      <span>라벨 프린터</span>
                    </button>
                  </div>
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

export default ReceivingCompletedList;
