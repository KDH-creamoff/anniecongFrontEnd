import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import DocumentStatusSummary from '../components/approval/DocumentStatusSummary';
import ApprovalTabSelector from '../components/approval/ApprovalTabSelector';
import DocumentList from '../components/approval/DocumentList';
import CreateDocumentModal from '../components/approval/CreateDocumentModal';

const ApprovalDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <>
            <DocumentList />
          </>
        );
      case 'pending':
        return (
          <>
            <div>내 결재대기 - 만드는 중</div>
          </>
        );
      case 'draft':
        return (
          <>
            <div>내가 작성한 문서 - 만드는 중</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <div className='mb-1 flex items-center space-x-2'>
            <FileText className='h-5 w-5 text-[#674529]' />
            <h1 className='text-lg font-semibold text-[#674529]'>
              전자결재 시스템
            </h1>
          </div>
          <p className='text-sm text-gray-600'>
            문서 결재 요청 및 승인 처리를 관리합니다
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 rounded-xl bg-[#724323] px-4 py-2 text-white transition-colors hover:bg-[#5a3419]'
        >
          <Plus className='h-5 w-5' />
          새 문서 작성
        </button>
      </div>

      {/* 문서 상태 요약 카드 */}
      <DocumentStatusSummary />

      {/* 탭 선택 */}
      <ApprovalTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 컨텐츠 */}
      {renderContent()}

      {/* 문서 작성 모달 */}
      <CreateDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ApprovalDashboard;
