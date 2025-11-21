import { useEffect, useMemo, useState, Fragment } from 'react';
import { Package, Edit, Trash2, Search, Save, X } from 'lucide-react';
import Pagination from '../common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBomById, updateBom } from '../../store/modules/basic/actions';
import { rawMaterialMaster } from '../../data/rawMaterialMaster';

const BOMList = ({ bomList = [], onDelete, loading = false, error = '', onSearch, onExpand }) => {
  const dispatch = useDispatch();
  const bomDetail = useSelector((state) => state.basic.bomDetail.data);
  const bomDetailLoading = useSelector((state) => state.basic.bomDetail.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedBOM, setSelectedBOM] = useState(null);
  const [editingBOM, setEditingBOM] = useState(null); // 수정 중인 BOM
  const itemsPerPage = 5;

  // bomDetail이 변경되면 selectedBOM 업데이트
  useEffect(() => {
    if (bomDetail && selectedBOM?._loading) {
      const materials = bomDetail.components || bomDetail.materials || [];
      setSelectedBOM({ 
        ...bomDetail, 
        _loading: false,
        materials: materials.map((c) => ({
          id: c.id,
          code: c.item?.code || c.itemCode || c.code,
          name: c.item?.name || c.name,
          amount: c.quantity || c.amount,
          unit: c.unit,
        }))
      });
    }
  }, [bomDetail, selectedBOM]);

  useEffect(() => {
    const t = setTimeout(() => { onSearch && onSearch(searchTerm); }, 300);
    return () => clearTimeout(t);
  }, [searchTerm, onSearch]);

  // BOM명으로 필터링
  const filteredBomList = useMemo(() => {
    if (!searchTerm.trim()) return bomList;
    return bomList.filter((bom) =>
      bom.bomName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bomList, searchTerm]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredBomList.length / itemsPerPage)),
    [filteredBomList.length]
  );

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBomList.slice(start, start + itemsPerPage);
  }, [filteredBomList, currentPage]);

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
    // Redux Saga를 통해 BOM 상세 정보 조회
    dispatch(fetchBomById.request(row.id));
  };

  // 수정 버튼 클릭
  const handleEditClick = (bom) => {
    setEditingBOM({
      id: bom.id,
      bomName: bom.bomName,
      materials: [...(bom.materials || [])],
    });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingBOM(null);
  };

  // BOM 명 수정
  const handleBOMNameChange = (newName) => {
    setEditingBOM({ ...editingBOM, bomName: newName });
  };

  // 수정 저장
  const handleSaveEdit = () => {
    if (!editingBOM.bomName.trim()) {
      alert('BOM 명을 입력해주세요.');
      return;
    }
    if (editingBOM.materials.length === 0) {
      alert('원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    const payload = {
      id: editingBOM.id,
      data: {
        name: editingBOM.bomName,
        bomName: editingBOM.bomName,
        materials: editingBOM.materials,
        components: editingBOM.materials.map((m, i) => ({
          itemCode: m.code,
          item: {
            code: m.code,
            name: m.name,
            unit: m.unit,
          },
          quantity: Number(m.amount),
          unit: m.unit,
          sortOrder: i + 1,
        })),
      },
    };

    dispatch(updateBom.request(payload));
    setEditingBOM(null);
    setSelectedBOM(null);
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
                      onClick={() => !editingBOM && handleBOMClick(bom)}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {editingBOM?.id === bom.id ? (
                          <input
                            type="text"
                            value={editingBOM.bomName}
                            onChange={(e) => handleBOMNameChange(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full rounded border border-[#674529] px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#674529]/20"
                          />
                        ) : (
                          bom.bomName
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{bom.updatedDate}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {editingBOM?.id === bom.id ? (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleSaveEdit(); }}
                                className="text-green-500 transition-colors hover:text-green-700"
                                title="저장"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCancelEdit(); }}
                                className="text-gray-500 transition-colors hover:text-red-600"
                                title="취소"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleEditClick(bom); }}
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
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {(selectedBOM?.id === bom.id || editingBOM?.id === bom.id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="rounded-lg bg-white p-4">
                            <h3 className="mb-3 text-sm font-medium text-gray-900">
                              {editingBOM?.id === bom.id ? '원재료 수정' : '등록된 원재료 목록'}
                            </h3>

                            {selectedBOM?._loading || bomDetailLoading ? (
                              <div className="p-3 text-xs text-gray-500">상세 불러오는 중…</div>
                            ) : editingBOM?.id === bom.id ? (
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
                                    {editingBOM.materials.map((m) => (
                                      <tr key={m.id} className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.code}</td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <select
                                            value={m.name}
                                            onChange={(e) => {
                                              const selectedMaterial = rawMaterialMaster.find(
                                                (material) => material.name === e.target.value
                                              );
                                              const newMaterials = editingBOM.materials.map((mat) =>
                                                mat.id === m.id
                                                  ? {
                                                      ...mat,
                                                      name: e.target.value,
                                                      code: selectedMaterial ? selectedMaterial.code : mat.code,
                                                    }
                                                  : mat
                                              );
                                              setEditingBOM({ ...editingBOM, materials: newMaterials });
                                            }}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#674529] focus:outline-none"
                                          >
                                            {rawMaterialMaster.map((material) => (
                                              <option key={material.code} value={material.name}>
                                                {material.name}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <input
                                            type="number"
                                            value={m.amount}
                                            onChange={(e) => {
                                              const newMaterials = editingBOM.materials.map((mat) =>
                                                mat.id === m.id ? { ...mat, amount: parseFloat(e.target.value) || 0 } : mat
                                              );
                                              setEditingBOM({ ...editingBOM, materials: newMaterials });
                                            }}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#674529] focus:outline-none"
                                          />
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">{m.unit}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
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
