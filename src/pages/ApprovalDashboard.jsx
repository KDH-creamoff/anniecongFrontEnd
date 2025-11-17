import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FileText, Plus } from 'lucide-react';
import DocumentStatusSummary from '../components/approval/DocumentStatusSummary';
import ApprovalTabSelector from '../components/approval/ApprovalTabSelector';
import DocumentList from '../components/approval/DocumentList';
import CreateDocumentModal from '../components/approval/CreateDocumentModal';
import SubmittedDocumentList from '../components/approval/SubmittedDocumentList';
import PendingDocumentList from '../components/approval/PendingDocumentList';
import ArchivedDocumentList from '../components/approval/ArchivedDocumentList';
import { fetchApprovalInbox } from '../store/modules/approval/actions';

const ApprovalDashboard = ({ subPage }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 컴포넌트 마운트 시 결재함 데이터 로드 
  useEffect(() => {
    dispatch(fetchApprovalInbox.request());
  }, [dispatch])

  const tabBar = () => {
    switch (activeTab) {
      case 'all':
        return <DocumentList />
      case 'pending':
        return <PendingDocumentList />
      case 'draft':
        return <SubmittedDocumentList />
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (subPage) {
      case 'nav1': // 결재시스템
        return (
          <>
            <DocumentStatusSummary />
            <ApprovalTabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            {tabBar()}
          </>
        );
      case 'nav2': // 문서보관함
        return <ArchivedDocumentList />
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch (subPage) {
      case 'nav1':
        return '결재시스템';
      case 'nav2':
        return '문서보관함';
      default:
        return '전자결재 시스템';
    }
  };

  const getPageDescription = () => {
    switch (subPage) {
      case 'nav1':
        return '문서 결재 요청 및 승인 처리를 관리합니다';
      case 'nav2':
        return '결재 완료된 문서를 보관하고 관리합니다';
      default:
        return '문서 결재 요청 및 승인 처리를 관리합니다';
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
              {getPageTitle()}
            </h1>
          </div>
          <p className='text-sm text-gray-600'>{getPageDescription()}</p>
        </div>
        {subPage === 'nav1' && (
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 rounded-xl bg-[#724323] px-4 py-2 text-white transition-colors hover:bg-[#5a3419]'
        >
          <Plus className='h-5 w-5' />
          새 문서 작성
        </button>
        )}
      </div>

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