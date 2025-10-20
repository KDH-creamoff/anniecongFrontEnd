import { X, FileText } from 'lucide-react';
import FeedMillStandards from '../template/FeedMillStandards';

const CreateDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className='mb-6 flex items-center justify-between'>
          <button
            onClick={onClose}
            className='rounded-lg p-1 transition-colors hover:bg-gray-100'
            aria-label='닫기'
          >
            <X className='h-5 w-5 text-gray-500' />
          </button>
        </div>
        <FeedMillStandards />
      </div>
    </div>
  );
};

export default CreateDocumentModal;
