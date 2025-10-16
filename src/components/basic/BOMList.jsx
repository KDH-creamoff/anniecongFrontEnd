import { useState } from 'react';
import { Package, Edit, Trash2, Search } from 'lucide-react';
import Pagination from '../common/Pagination';

const BOMList = ({ bomList, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBOM, setSelectedBOM] = useState(null);
  const itemsPerPage = 10;

  // 검색 필터링
  const filteredBomList = bomList.filter((bom) =>
    bom.bomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBomList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredBomList.slice(startIndex, endIndex);

  // BOM 목록 삭제
  const handleDeleteBOM = (id) => {
    if (window.confirm('이 BOM을 삭제하시겠습니까?')) {
      if (onDelete) {
        onDelete(id);
      }
      if (selectedBOM && selectedBOM.id === id) {
        setSelectedBOM(null);
      }
    }
  };

  // BOM 목록 클릭 시 상세 보기
  const handleBOMClick = (bom) => {
    if (selectedBOM && selectedBOM.id === bom.id) {
      setSelectedBOM(null);
    } else {
      setSelectedBOM(bom);
    }
  };

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>BOM 목록 관리</h2>
      </div>

      {/* 검색창 */}
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='BOM 명으로 검색'
            className='w-full rounded-xl border border-gray-100 bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20'
          />
        </div>
      </div>

      {/* BOM 목록 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                BOM 명
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                업데이트 날짜
              </th>
              <th className='px-4 py-3 text-center text-sm font-medium text-gray-900'>
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((bom) => (
              <>
                <tr
                  key={bom.id}
                  className='cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50/50'
                  onClick={() => handleBOMClick(bom)}
                >
                  <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                    {bom.bomName}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    {bom.updatedDate}
                  </td>
                  <td className='px-4 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // 수정 기능 (추후 구현)
                        }}
                        className='text-gray-500 transition-colors hover:text-[#674529]'
                      >
                        <Edit className='h-4 w-4' />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBOM(bom.id);
                        }}
                        className='text-gray-500 transition-colors hover:text-red-600'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* 상세 보기 행 */}
                {selectedBOM && selectedBOM.id === bom.id && (
                  <tr className='bg-gray-50'>
                    <td colSpan={3} className='px-4 py-4'>
                      <div className='rounded-lg bg-white p-4'>
                        <h3 className='mb-3 text-sm font-medium text-gray-900'>
                          등록된 원재료 목록
                        </h3>
                        <div className='overflow-x-auto'>
                          <table className='w-full'>
                            <thead className='border-b border-gray-200'>
                              <tr>
                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-700'>
                                  원재료 코드
                                </th>
                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-700'>
                                  원재료명
                                </th>
                                <th className='px-4 py-2 text-left text-xs font-medium text-gray-700'>
                                  필요량
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {bom.materials.map((material) => (
                                <tr
                                  key={material.id}
                                  className='border-b border-gray-100'
                                >
                                  <td className='px-4 py-2 text-xs text-gray-700'>
                                    {material.code}
                                  </td>
                                  <td className='px-4 py-2 text-xs text-gray-700'>
                                    {material.name}
                                  </td>
                                  <td className='px-4 py-2 text-xs text-gray-700'>
                                    {material.amount}g
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BOMList;
