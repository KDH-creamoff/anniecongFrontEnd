import { Loader2 } from 'lucide-react';

/**
 * PDF 생성 로딩 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {string} props.message - 표시할 메시지
 */
const PdfLoadingModal = ({ isOpen, message = 'PDF를 생성하고 있습니다. 잠시만 기다려주세요...' }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4'>
        <div className='flex flex-col items-center text-center'>
          {/* 로딩 스피너 */}
          <div className='mb-6'>
            <Loader2 className='h-16 w-16 text-[#724323] animate-spin' />
          </div>

          {/* 메시지 */}
          <h3 className='text-xl font-bold text-gray-900 mb-2'>PDF 생성 중</h3>
          <p className='text-gray-600 text-sm leading-relaxed'>{message}</p>

          {/* 프로그레스 바 */}
          <div className='w-full mt-6'>
            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
              <div className='h-full bg-[#724323] rounded-full animate-pulse' style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* 추가 안내 */}
          <p className='text-xs text-gray-500 mt-4'>이 창을 닫지 마세요</p>
        </div>
      </div>
    </div>
  );
};

export default PdfLoadingModal;
