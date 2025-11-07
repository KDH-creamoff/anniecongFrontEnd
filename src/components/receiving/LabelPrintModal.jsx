import { X } from 'lucide-react';
import { useState } from 'react';

const LabelPrintModal = ({ isOpen, onClose, onPrintComplete, itemData }) => {
  const [labelSize, setLabelSize] = useState('');
  const [category, setCategory] = useState('');
  const [manufactureDate, setManufactureDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  // 모든 필드가 입력되었는지 확인
  const isFormValid = () => {
    return (
      labelSize &&
      labelSize !== '템플릿 양식 선택' &&
      category &&
      category !== '제품명 선택' &&
      manufactureDate &&
      quantity &&
      quantity !== ''
    );
  };

  const handlePrint = () => {
    const labelData = {
      labelSize,
      category,
      manufactureDate,
      quantity,
      itemData,
    };
    console.log('라벨 프린트:', labelData);

    // 프린트 완료 후 콜백 호출
    if (onPrintComplete) {
      onPrintComplete(labelData);
    } else {
      onClose();
    }
  };

  // 바코드 번호 생성 (임시)
  const generateBarcode = () => {
    return '8 500278470312';
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-full max-w-2xl rounded-xl bg-white shadow-xl'>
        {/* 모달 헤더 */}
        <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
          <h2 className='text-lg font-semibold text-[#674529]'>라벨 프린트</h2>
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className='px-6 py-4'>
          <div className='grid grid-cols-2 gap-6'>
            {/* 왼쪽: 설정 영역 */}
            <div className='space-y-4'>
              {/* 템플릿 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  템플릿
                </label>
                <select
                  value={labelSize}
                  onChange={(e) => setLabelSize(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                >
                  <option value='템플릿 양식 선택' disabled hidden>템플릿 양식 선택</option>
                  <option value='100X100'>100X100</option>
                  <option value='80X60'>80X60</option>
                  <option value='40X20'>40X20</option>
                  <option value='15X26'>15X26</option>
                </select>
              </div>

              {/* 제품명 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  제품명
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                >
                  <option value='제품명 선택' disabled hidden>제품명 선택</option>
                  <option value='당근'>당근</option>
                  <option value='닭고기 (가슴살)'>닭고기 (가슴살)</option>
                  <option value='소고기(등심)'>소고기(등심)</option>
                  <option value='고구마'>고구마</option>
                </select>
              </div>

              {/* 제조일자 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  제조일자
                </label>
                <input
                  type='date'
                  value={manufactureDate}
                  onChange={(e) => setManufactureDate(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                />
              </div>

              {/* 제품수량 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  제품수량
                </label>
                <input
                  type='number'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                  placeholder='100'
                />
              </div>
            </div>

            {/* 오른쪽: 미리보기 영역 */}
            <div className='flex flex-col items-center justify-center'>
              <div className='w-full rounded-lg border-2 border-gray-300 bg-white p-6'>
                {/* 바코드 이미지 */}
                <div className='mb-2 flex items-center justify-center bg-gray-100 py-8'>
                  <div className='text-center'>
                    {/* 바코드 바 시뮬레이션 */}
                    <div className='mb-2 flex justify-center space-x-px'>
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className='h-20 bg-black'
                          style={{
                            width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px',
                          }}
                        />
                      ))}
                    </div>
                    {/* 바코드 번호 */}
                    <p className='text-xs font-mono'>{generateBarcode()}</p>
                  </div>
                </div>
                {/* 미리보기 텍스트 */}
                <p className='text-center text-sm text-gray-600'>
                  *미리보기용 이미지
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className='flex items-center justify-center border-t border-gray-200 px-6 py-4'>
          <button
            onClick={handlePrint}
            disabled={!isFormValid()}
            className={`w-32 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
              isFormValid()
                ? 'bg-[#674529] hover:bg-[#553821] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            프린트
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelPrintModal;
