import StatusSummaryBar from '../components/manufacturing/StatusSummaryBar';
import WorkOrderList from '../components/manufacturing/WorkOrderList';

const Manufacturing = ({ subPage }) => {
  // 서브 페이지에 따른 컴포넌트 렌더링
  const renderContent = () => {
    switch (subPage) {
      case 'nav1':
        // 1공장 전처리
        return (
          <div className="p-6">
            <StatusSummaryBar />
            <WorkOrderList />
          </div>
        );

      case 'nav2':
        // 공장간 이동
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#674529] mb-4">공장간 이동</h2>
              <p className="text-gray-600">공장간 이동 관리 페이지입니다.</p>
            </div>
          </div>
        );

      case 'nav3':
        // 2공장 제조
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#674529] mb-4">2공장 제조</h2>
              <p className="text-gray-600">2공장 제조 관리 페이지입니다.</p>
            </div>
          </div>
        );

      case 'nav4':
        // 작업내용추가
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#674529] mb-4">작업내용추가</h2>
              <p className="text-gray-600">작업내용 추가 페이지입니다.</p>
            </div>
          </div>
        );

      default:
        // 기본값: nav1 표시
        return (
          <div className="p-6">
            <StatusSummaryBar />
            <WorkOrderList />
          </div>
        );
    }
  };

  return renderContent();
};

export default Manufacturing;
