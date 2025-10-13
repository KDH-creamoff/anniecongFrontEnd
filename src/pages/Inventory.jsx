import { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';
import InventoryTabSelector from '../components/inventory/InventoryTabSelector';
import InventoryStatusFilter from '../components/inventory/InventoryStatusFilter';
import InventoryStatusSummary from '../components/inventory/InventoryStatusSummary';
import InventoryStatusList from '../components/inventory/InventoryStatusList';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [filters, setFilters] = useState({
    category: '전체',
    warehouse: '전체',
    status: '전체',
    searchTerm: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // 필터에 따라 데이터를 다시 불러오는 로직 추가
    console.log('필터 변경:', newFilters);
  };

  const handleExport = () => {
    // 데이터 내보내기 로직
    console.log('데이터 내보내기');
    alert('데이터를 내보내는 중입니다...');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'status':
        return (
          <>
            <InventoryStatusFilter onFilterChange={handleFilterChange} />
            <InventoryStatusSummary />
            <InventoryStatusList filters={filters} />
          </>
        );
      case 'tracking':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <p className="text-gray-600">이력 추적 기능은 준비 중입니다.</p>
          </div>
        );
      case 'dashboard':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <p className="text-gray-600">분석 대시보드는 준비 중입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <BarChart3 className="w-5 h-5 text-[#674529]" />
            <h1 className="text-lg font-semibold text-[#674529]">재고/이력 조회</h1>
          </div>
          <p className="text-sm text-gray-600">공장, 창고, 로트, 유통기한 필터 및 바코드 히스토리</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 text-[#674529] rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Download size={16} />
          <span>데이터 내보내기</span>
        </button>
      </div>

      {/* 탭 선택 */}
      <InventoryTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 컨텐츠 */}
      {renderContent()}
    </div>
  );
};

export default Inventory;
