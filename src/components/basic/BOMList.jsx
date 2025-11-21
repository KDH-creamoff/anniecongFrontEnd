import { useEffect, useMemo, useState, Fragment } from 'react';
import { Package, Edit, Trash2, Search, Save, X, Plus } from 'lucide-react';
import Pagination from '../common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBomById, updateBom, fetchItems } from '../../store/modules/basic/actions';

const BOMList = ({ bomList = [], onDelete, loading = false, error = '', onSearch, onExpand }) => {
  const dispatch = useDispatch();
  const bomDetail = useSelector((state) => state.basic.bomDetail.data);
  const bomDetailLoading = useSelector((state) => state.basic.bomDetail.loading);
  const bomOperation = useSelector((state) => state.basic.bomOperation);
  const { data: items } = useSelector((state) => state.basic.items);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBOM, setSelectedBOM] = useState(null);
  const [editingBOM, setEditingBOM] = useState(null);

  const itemsPerPage = 10;

  // 아이템 목록 조회
  useEffect(() => {
    dispatch(fetchItems.request({ category: '' }));
  }, [dispatch]);

  // 카테고리 한글 변환
  const getCategoryName = (category) => {
    const categoryMap = {
      RawMaterial: '원재료',
      SemiFinished: '반제품',
      Finished: '완제품',
      Supply: '소모품',
      원재료: '원재료',
      반제품: '반제품',
      완제품: '완제품',
      소모품: '소모품',
    };
    return categoryMap[category] ?? category ?? '-';
  };

  // 원재료/반제품 필터
  const rawAndSemiMaterials = (items ?? []).filter(
    (item) =>
      item.category === '원재료' ||
      item.category === '반제품' ||
      item.category === 'RawMaterial' ||
      item.category === 'SemiFinished',
  );

  // 🔁 bomDetail → selectedBOM 싱크 (한 번만 채우기)
  useEffect(() => {
    if (!bomDetail) return;

    setSelectedBOM((prev) => {
      // 선택된 BOM이 없거나, 다른 BOM이면 건드리지 않음
      if (!prev || !prev._loading || prev.id !== bomDetail.id) {
        return prev;
      }

      const materialsFromDetail = bomDetail.components ?? bomDetail.materials ?? [];

      return {
        ...prev,
        ...bomDetail,
        _loading: false,
        materials: materialsFromDetail.map((c) => ({
          id: c.id,
          code: c.item?.code ?? c.itemCode ?? c.code,
          name: c.item?.name ?? c.name,
          amount: c.quantity ?? c.amount,
          unit: c.unit,
        })),
      };
    });
  }, [bomDetail]);

  // 🔁 bomDetail → editingBOM 싱크 (수정 모드일 때 재료 채우기)
  useEffect(() => {
    if (!bomDetail) return;

    setEditingBOM((prev) => {
      if (!prev || prev.id !== bomDetail.id) {
        return prev;
      }

      const materialsFromDetail = bomDetail.components ?? bomDetail.materials ?? [];

      return {
        ...prev,
        materials: materialsFromDetail.map((c) => ({
          id: c.id,
          code: c.item?.code ?? c.itemCode ?? c.code,
          name: c.item?.name ?? c.name,
          amount: c.quantity ?? c.amount,
          unit: c.unit,
        })),
      };
    });
  }, [bomDetail]);

  // 수정 성공 시 초기화
  useEffect(() => {
    if (!bomOperation || bomOperation.loading || !bomOperation.data) {
      return;
    }
    setEditingBOM(null);
    setSelectedBOM(null);
    dispatch(fetchBomById.request(null));
  }, [bomOperation, dispatch]);

  // 검색 디바운스
  useEffect(() => {
    const t = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm, onSearch]);

  // BOM명 필터
  const filteredBomList = useMemo(() => {
    if (!searchTerm.trim()) return bomList;
    return bomList.filter((bom) =>
      (bom.bomName ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [bomList, searchTerm]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredBomList.length / itemsPerPage)),
    [filteredBomList.length],
  );

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBomList.slice(start, start + itemsPerPage);
  }, [filteredBomList, currentPage]);

  const handleDeleteBOM = async (id) => {
    const confirmed = window.confirm('이 BOM을 삭제하시겠습니까?');
    if (!confirmed) return;
    await onDelete?.(id);
    if (selectedBOM?.id === id) {
      setSelectedBOM(null);
    }
  };

  const handleBOMClick = (row) => {
    if (editingBOM) {
      // 수정 중일 때 행 클릭 방지
      return;
    }

    // 같은 BOM 다시 클릭 → 닫기
    if (selectedBOM?.id === row.id && !selectedBOM?._loading) {
      setSelectedBOM(null);
      dispatch(fetchBomById.request(null));
      return;
    }

    // 새로운 BOM 선택
    setSelectedBOM({
      ...row,
      _loading: true,
      materials: [],
    });
    dispatch(fetchBomById.request(row.id));
  };

  // 수정 버튼 클릭
  const handleEditClick = (bom) => {
    // 일단 이름/ID만 세팅
    setEditingBOM({
      id: bom.id,
      bomName: bom.bomName,
      materials: [],
    });

    // 펼쳐진 상세는 접기
    setSelectedBOM(null);

    // 현재 bomDetail이 다른 BOM이면 새로 조회
    if (!bomDetail || bomDetail.id !== bom.id) {
      dispatch(fetchBomById.request(bom.id));
    } else {
      // 이미 같은 BOM의 상세가 있으면 바로 채우기
      const materialsFromDetail = bomDetail.components ?? bomDetail.materials ?? [];
      setEditingBOM((prev) => {
        if (!prev || prev.id !== bom.id) {
          return prev;
        }
        return {
          ...prev,
          materials: materialsFromDetail.map((c) => ({
            id: c.id,
            code: c.item?.code ?? c.itemCode ?? c.code,
            name: c.item?.name ?? c.name,
            amount: c.quantity ?? c.amount,
            unit: c.unit,
          })),
        };
      });
    }
  };

  // 원재료 추가
  const handleAddMaterial = () => {
    if (!editingBOM) return;
    const nextId =
      editingBOM.materials.length > 0
        ? Math.max(...editingBOM.materials.map((item) => item.id)) + 1
        : 1;

    setEditingBOM({
      ...editingBOM,
      materials: [
        ...editingBOM.materials,
        {
          id: nextId,
          code: '',
          name: '',
          amount: 0,
          unit: 'g',
        },
      ],
    });
  };

  // 원재료 삭제
  const handleDeleteMaterial = (materialId) => {
    if (!editingBOM) return;
    setEditingBOM({
      ...editingBOM,
      materials: editingBOM.materials.filter((m) => m.id !== materialId),
    });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingBOM(null);
  };

  // BOM 명 수정
  const handleBOMNameChange = (newName) => {
    if (!editingBOM) return;
    setEditingBOM({ ...editingBOM, bomName: newName });
  };

  // 수정 저장
  const handleSaveEdit = () => {
    if (!editingBOM) return;

    if (!editingBOM.bomName.trim()) {
      alert('BOM 명을 입력해주세요.');
      return;
    }
    if (editingBOM.materials.length === 0) {
      alert('원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    const validMaterials = editingBOM.materials.filter(
      (m) => m.code && m.code.trim().length > 0,
    );
    if (validMaterials.length === 0) {
      alert('유효한 원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    const payload = {
      id: editingBOM.id,
      data: {
        name: editingBOM.bomName,
        bomName: editingBOM.bomName,
        materials: validMaterials,
        components: validMaterials.map((m, index) => ({
          itemCode: m.code,
          item: {
            code: m.code,
            name: m.name,
            unit: m.unit,
          },
          quantity: Number(m.amount),
          unit: m.unit,
          sortOrder: index + 1,
        })),
      },
    };

    dispatch(updateBom.request(payload));
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    업데이트 날짜
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">작업</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((bom) => (
                  <Fragment key={bom.id}>
                    <tr
                      className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50/50"
                      onClick={() => handleBOMClick(bom)}
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
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveEdit();
                                }}
                                className="text-green-500 transition-colors hover:text-green-700"
                                title="저장"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelEdit();
                                }}
                                className="text-gray-500 transition-colors hover:text-red-600"
                                title="취소"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(bom);
                                }}
                                className="text-gray-500 transition-colors hover:text-[#674529]"
                                title="수정"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBOM(bom.id);
                                }}
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
                                      <th className="w-[12%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        원재료 코드
                                      </th>
                                      <th className="w-[40%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        원재료명
                                      </th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        필요량
                                      </th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        단위
                                      </th>
                                      <th className="w-[10%] px-4 py-2 text-center text-xs font-medium text-gray-700">
                                        작업
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {editingBOM.materials.map((m) => (
                                      <tr key={m.id} className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <input
                                            type="text"
                                            value={m.code}
                                            readOnly
                                            className="w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-500 focus:outline-none"
                                          />
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <select
                                            value={m.code ?? ''}
                                            onChange={(e) => {
                                              const selectedMaterial = rawAndSemiMaterials.find(
                                                (material) => material.code === e.target.value,
                                              );
                                              if (!selectedMaterial) {
                                                return;
                                              }
                                              const newMaterials = editingBOM.materials.map(
                                                (mat) =>
                                                  mat.id === m.id
                                                    ? {
                                                        ...mat,
                                                        code: selectedMaterial.code,
                                                        name: selectedMaterial.name,
                                                        unit: selectedMaterial.unit ?? 'g',
                                                      }
                                                    : mat,
                                              );
                                              setEditingBOM({
                                                ...editingBOM,
                                                materials: newMaterials,
                                              });
                                            }}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#674529] focus:outline-none"
                                          >
                                            <option value="">원재료/반재료 선택</option>
                                            {rawAndSemiMaterials.map((material) => (
                                              <option key={material.code} value={material.code}>
                                                [{getCategoryName(material.category)}]{' '}
                                                {material.name}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={
                                              editingBOM.materials.find(
                                                (mat) => mat.id === m.id,
                                              )?.amount ?? 0
                                            }
                                            onChange={(e) => {
                                              const numAmount = Number.isNaN(
                                                Number(e.target.value),
                                              )
                                                ? 0
                                                : Number(e.target.value);
                                              const newMaterials = editingBOM.materials.map(
                                                (mat) =>
                                                  mat.id === m.id
                                                    ? { ...mat, amount: numAmount }
                                                    : mat,
                                              );
                                              setEditingBOM({
                                                ...editingBOM,
                                                materials: newMaterials,
                                              });
                                            }}
                                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#674529] focus:outline-none"
                                            placeholder="0.00"
                                          />
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          <input
                                            type="text"
                                            value={m.unit}
                                            readOnly
                                            className="w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-500 focus:outline-none"
                                          />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                          <button
                                            onClick={() => handleDeleteMaterial(m.id)}
                                            className="text-red-500 transition-colors hover:text-red-700"
                                            title="삭제"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div className="mt-3 flex justify-end">
                                  <button
                                    onClick={handleAddMaterial}
                                    className="flex items-center gap-2 rounded-xl bg-[#56331F] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#432618] hover:shadow-md active:scale-95"
                                  >
                                    <Plus className="h-4 w-4" />
                                    원재료 추가
                                  </button>
                                </div>
                              </div>
                            ) : (selectedBOM?.materials ?? []).length === 0 ? (
                              <div className="p-3 text-xs text-gray-500">
                                등록된 자재가 없습니다.
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="border-b border-gray-200">
                                    <tr>
                                      <th className="w-[12%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        원재료 코드
                                      </th>
                                      <th className="w-[50%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        원재료명
                                      </th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        필요량
                                      </th>
                                      <th className="w-[19%] px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        단위
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedBOM?.materials.map((m) => (
                                      <tr key={m.id} className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          {m.code}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          {m.name}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          {typeof m.amount === 'number'
                                            ? m.amount.toFixed(2)
                                            : m.amount}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-gray-700">
                                          {m.unit}
                                        </td>
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
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      BOM이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BOMList;
