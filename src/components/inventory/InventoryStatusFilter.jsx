import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const InventoryStatusFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '전체',
    warehouse: '전체',
    status: '전체',
    searchTerm: ''
  });

  const categories = ['전체', '원재료', '완제품', '반제품', '소모품'];
  const warehouses = ['전체', '의성자재창고', '상주자재창고', '상주생산 창고', '의성 생산 창고'];
  const statuses = ['전체', '정상', '부족', '유통기한 임박'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = {
      category: '전체',
      warehouse: '전체',
      status: '전체',
      searchTerm: ''
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-[#674529]" />
        <h3 className="text-lg font-semibold text-[#674529]">필터 및 검색</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-[#674529] mb-2">
            카테고리
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F5E9D5] border-0 rounded-lg text-[#674529] appearance-none cursor-pointer focus:ring-2 focus:ring-[#A3C478] outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#674529] pointer-events-none" />
          </div>
        </div>

        {/* 창고 */}
        <div>
          <label className="block text-sm font-medium text-[#674529] mb-2">
            창고
          </label>
          <div className="relative">
            <select
              value={filters.warehouse}
              onChange={(e) => handleFilterChange('warehouse', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F5E9D5] border-0 rounded-lg text-[#674529] appearance-none cursor-pointer focus:ring-2 focus:ring-[#A3C478] outline-none transition-all"
            >
              {warehouses.map((wh) => (
                <option key={wh} value={wh}>{wh}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#674529] pointer-events-none" />
          </div>
        </div>

        {/* 상태 */}
        <div>
          <label className="block text-sm font-medium text-[#674529] mb-2">
            상태
          </label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F5E9D5] border-0 rounded-lg text-[#674529] appearance-none cursor-pointer focus:ring-2 focus:ring-[#A3C478] outline-none transition-all"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#674529] pointer-events-none" />
          </div>
        </div>

        {/* 검색 */}
        <div>
          <label className="block text-sm font-medium text-[#674529] mb-2">
            검색
          </label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            placeholder="품목명 또는 코드"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[#674529] placeholder-gray-400 focus:ring-2 focus:ring-[#A3C478] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* 초기화 버튼 */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-6 py-2.5 bg-white border border-gray-300 text-[#674529] rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatusFilter;
