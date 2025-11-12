import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const InventoryStatusFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '전체',
    warehouse: '전체',
    status: '전체',
    searchTerm: '',
  });

  const categories = ['전체', '원재료', '완제품', '반재료', '소모품'];
  const warehouses = [
    '전체',
    '의성자재창고',
    '상주자재창고',
    '상주생산창고',
    '의성생산창고',
  ];
  const statuses = ['전체', '정상', '재고부족', '유통기한 임박', '유통기한 만료'];

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
      searchTerm: '',
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className='mb-6 rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center space-x-2'>
        <Filter className='h-5 w-5 text-[#674529]' />
        <h3 className='text-lg text-[#674529]'>필터 및 검색</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
        {/* 카테고리 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            카테고리
          </label>
          <div className='relative'>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]' />
          </div>
        </div>

        {/* 창고 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            창고
          </label>
          <div className='relative'>
            <select
              value={filters.warehouse}
              onChange={(e) => handleFilterChange('warehouse', e.target.value)}
              className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
            >
              {warehouses.map((wh) => (
                <option key={wh} value={wh}>
                  {wh}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]' />
          </div>
        </div>

        {/* 상태 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            상태
          </label>
          <div className='relative'>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]' />
          </div>
        </div>

        {/* 검색 */}
        <div>
          <label className='mb-2 block text-sm font-medium'>
            검색
          </label>
          <input
            type='text'
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            placeholder='품목명 또는 코드'
            className='w-full rounded-xl border border-gray-300 px-4 py-2.5 placeholder-gray-400 outline-none transition-all focus:border-transparent'
          />
        </div>

        {/* 초기화 버튼 */}
        <div className='flex items-end'>
          <button
            onClick={handleReset}
            className='w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 font-medium text-[#000] transition-colors hover:bg-gray-50'
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatusFilter;
