import StatusSummaryBar from '../components/manufacturing/StatusSummaryBar';
import WorkOrderList from '../components/manufacturing/WorkOrderList';
import TransferRegistration from '../components/manufacturing/TransferRegistration';
import TransferStatus from '../components/manufacturing/TransferStatus';
import { ArrowRightLeft, Factory } from 'lucide-react';
import ManufacturingHistoryView from '../components/manufacturing/ManufacturingHistoryView';
import WorkOrderManagement from '../components/manufacturing/WorkOrderManagement';

const Manufacturing = ({ subPage }) => {
  // 서브 페이지에 따른 컴포넌트 렌더링
  const renderContent = () => {
    switch (subPage) {
      case 'nav1':
        // 제조이력 캘린더
        return (
          <div>
            <ManufacturingHistoryView />
          </div>
        );

      case 'nav2':
        // 1공장 전처리
        return (
          <div className="p-6">
            <StatusSummaryBar />
            <WorkOrderList />
          </div>
        );

      case 'nav3':
        // 공장간 이동
        return (
          <div className="p-6">
            <div className='mb-4 flex items-center space-x-2'>
              <ArrowRightLeft className='h-5 w-5 text-[#674529]'/>
              <h2 className="text-lg font-semibold text-[#674529]">공장간 이동 관리</h2>
            </div>
            <TransferRegistration />
            <TransferStatus />
          </div>
        );

      case 'nav4':
        // 2공장 제조
        return (
          <div>
            <div className='mb-1 flex items-center space-x-2'>
              <Factory className='h-5 w-5 text-[#674529]'/>
              <h2 className="text-lg font-semibold text-[#674529]">2공장 제조</h2>
            </div>
          </div>
        );

      case 'nav5':
        // 작업지시서 관리
        return <WorkOrderManagement />;

      default:
        // 기본값: nav1 표시
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#674529] mb-4">제조이력 캘린더</h2>
              <p className="text-gray-600">제조이력 캘린더 페이지입니다.</p>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default Manufacturing;