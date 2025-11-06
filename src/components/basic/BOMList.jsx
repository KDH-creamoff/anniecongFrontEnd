import { useEffect, useMemo, useState, Fragment } from 'react';
import { Package, Edit, Trash2, Search } from 'lucide-react';
import Pagination from '../common/Pagination';

const BOMList = ({ bomList = [], onDelete, loading = false, error = '', onSearch, onExpand }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedBOM, setSelectedBOM] = useState(null); 
  const itemsPerPage = 10;

  useEffect(() => {
    const t = setTimeout(() => { onSearch && onSearch(searchTerm); }, 300);
    return () => clearTimeout(t);
  }, [searchTerm, onSearch]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(bomList.length / itemsPerPage)),
    [bomList.length]
  );

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return bomList.slice(start, start + itemsPerPage);
  }, [bomList, currentPage]);

  const handleDeleteBOM = async (id) => {
    if (!window.confirm('이 BOM을 삭제하시겠습니까?')) return;
    await onDelete?.(id);
    if (selectedBOM?.id === id) setSelectedBOM(null);
  };

  const handleBOMClick = async (row) => {
    if (selectedBOM?.id === row.id && !selectedBOM?._loading) {
      setSelectedBOM(null);
      return;
    }
    setSelectedBOM({ ...row, _loading: true, materials: [] });
    try {
      const detail = await onExpand?.(row.id);
      setSelectedBOM({ ...(detail || row), _loading: false });
    } catch {
      setSelectedBOM({ ...row, _loading: false, materials: [] });
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Package className="h-5 w-5 text-[#674529]" />
        <h2 className="text-base text-[#674529]">BOM 목록 관리</h2>
      </div>

      {/* 검색창 */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="BOM 명으로 검색"
            className="w-full rounded-xl border border-gray-100 bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-sm text-gray-600">불러오는 중...</div>
      ) : error ? (
        <div className="p-4 text-sm text-red-600">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">BOM 명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">업데이트 날짜</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">작업</th>
                </tr>
              </thead>

              {/* ⛔️ tbody 중첩 없이 Fragment로 행+상세 묶기 */}
              <tbody>
                {currentData.map((bom) => (
                  <Fragment key={bom.id}>
                    <tr
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50/50"
                      onClick={() => handleBOMClick(bom)}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{bom.bomName}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{bom.updatedDate}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); alert('수정은 상세화면에서 구현 예정'); }}
                            className="text-gray-500 transition-colors hover:text-[#674529]"
                            title="수정"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteBOM(bom.id); }}
                            className="text-gray-500 transition-colors hover:text-red-600"
                            title="삭제"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {selectedBOM?.id === bom.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="rounded-lg bg-white p-4">
                            <h3 className="mb-3 text-sm font-medium text-gray-900">등록된 원재료 목록</h3>

                            {selectedBOM?._loading ? (
                              <div className="p-3 text-xs text-gray-500">상세 불러오는 중…</div>
                            ) : (selectedBOM.materials || []).length === 0 ? (
                              <div className="p-3 text-xs text-gray-500">등록된 자재가 없습니다.</div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="border-b border-gray-200">
                                    <tr>
                                      <th className="w-[12%] px-4 py-2 text-left text-xs font-medium text-gray-700">원재료 코드</th>
                                      <th className="w-[50%] px-4 py-2 text-left text-xs font-medium text-gray-700">원재료명</th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">필요량</th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">단위</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedBOM.materials.map((m) => (
                                      <tr key={m.id} className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.code}</td>
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.name}</td>
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.amount}</td>
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.unit}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}

                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">BOM이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default BOMList;
