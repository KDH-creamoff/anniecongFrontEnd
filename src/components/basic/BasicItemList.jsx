import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Edit, Trash2, Factory, Save, X } from 'lucide-react';
import Pagination from '../common/Pagination';
import { fetchItems, updateItem, deleteItem, fetchFactories, fetchStorageConditions } from '../../store/modules/basic/actions';
import {
  selectItems,
  selectItemsLoading,
  selectItemOperation,
  selectItemOperationLoading,
  selectFactories,
  selectFactoriesLoading,
  selectStorageConditions,
  selectStorageConditionsLoading,
} from '../../store/modules/basic/selectors';

const BasicItemList = () => {
  const dispatch = useDispatch();

  // Redux 상태 조회
  const items = useSelector(selectItems) || [];
  const itemsLoading = useSelector(selectItemsLoading);
  const itemOperation = useSelector(selectItemOperation);
  const itemOperationLoading = useSelector(selectItemOperationLoading);
  const factories = useSelector(selectFactories) || [];
  const factoriesLoading = useSelector(selectFactoriesLoading);
  const storageConditions = useSelector(selectStorageConditions) || [];
  const storageConditionsLoading = useSelector(selectStorageConditionsLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [lastOperationType, setLastOperationType] = useState(null); // 마지막 작업 타입 추적

  // 컴포넌트 마운트 시 품목 목록, 공장 목록, 보관 조건 목록 조회
  useEffect(() => {
    dispatch(fetchItems.request());
    dispatch(fetchFactories.request());
    dispatch(fetchStorageConditions.request());
  }, [dispatch]);

  // 품목 수정/삭제 성공 시 목록 다시 조회 및 성공 메시지 표시
  useEffect(() => {
    if (itemOperation && !itemOperationLoading && !itemOperation.error) {
      // 성공 메시지 표시
      if (lastOperationType === 'update') {
        alert('품목이 수정되었습니다.');
      } else if (lastOperationType === 'delete') {
        alert('품목이 삭제되었습니다.');
      }
      
      dispatch(fetchItems.request());
      setEditingItemId(null);
      setEditForm({});
      setLastOperationType(null); // 메시지 표시 후 초기화
    }
  }, [itemOperation, itemOperationLoading, lastOperationType, dispatch]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handleDelete = (itemId) => {
    if (!window.confirm('정말로 이 품목을 삭제하시겠습니까?')) return;
    setLastOperationType('delete'); // 삭제 작업 타입 저장
    dispatch(deleteItem.request(itemId));

    // 현재 페이지의 마지막 항목 삭제 시 페이지 조정
    if ((currentPage - 1) * itemsPerPage >= items.length - 1) {
      setCurrentPage((p) => Math.max(1, p - 1));
    }
  };

  const handleEditStart = (item) => {
    setEditingItemId(item.id);
    // storageConditionId는 ID로 저장되어야 함
    const storageConditionId = item.storage_condition_id || item.storageConditionId || item.StorageCondition?.id || '';
    // 카테고리는 영어 값으로 저장되어야 함
    const category = item.category || '';
    setEditForm({
      name: item.name,
      category: category, // 영어 값 그대로 저장
      factoryId: item.factory_id || item.factoryId || item.Factory?.id || '',
      storageConditionId: storageConditionId,
      shelfLife: item.expiration_date || item.shelfLife || item.shelf_life || '',
      shortage: item.shortage ?? item.shortage_amount ?? '',
      wholesalePrice: item.wholesalePrice ?? item.wholesale_price ?? '',
      unit: item.unit,
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm((f) => ({
      ...f,
      [field]: value,
    }));
  };

  const handleEditCancel = () => {
    setEditingItemId(null);
    setEditForm({});
  };

  const handleEditSave = (item) => {
    const payload = {
      code: item.code, // 품목코드 포함
      name: editForm.name.trim(),
      category: editForm.category,
      factoryId: Number(editForm.factoryId),
      storageConditionId: Number(editForm.storageConditionId), // ID로 변환
      shelfLife: Number(editForm.shelfLife),
      shortage: Number(editForm.shortage) || 0, // 최소 보유 갯수 포함
      wholesalePrice: Number(editForm.wholesalePrice) || 0,
      unit: editForm.unit,
    };

    setLastOperationType('update'); // 수정 작업 타입 저장
    dispatch(updateItem.request({ id: item.id, data: payload }));
  };

  // 카테고리 영어 값을 한글로 변환
  const getCategoryName = (category) => {
    const categoryMap = {
      'RawMaterial': '원재료',
      'SemiFinished': '반제품',
      'Finished': '완제품',
      'Supply': '소모품',
      'raw_material': '원재료',
      'semi_finished': '반재료',
      'finished_product': '완제품',
      'consumable': '소모품',
      '원재료': '원재료',
      '반제품': '반제품',
      '완제품': '완제품',
      '소모품': '소모품',
    };
    return categoryMap[category] || category || '-';
  };
  
  // 한글 카테고리를 영어로 변환 (저장용)
  const getCategoryValue = (category) => {
    const reverseMap = {
      '원재료': 'RawMaterial',
      '반제품': 'SemiFinished',
      '완제품': 'Finished',
      '소모품': 'Supply',
    };
    return reverseMap[category] || category;
  };

  const getFactoryName = (item) => {
    const factoryId = item?.factoryId || item?.Factory?.id || item?.factory_id;
    // Redux에서 공장 목록을 가져와서 매칭
    const factory = factories.find(f => f.id === factoryId);
    if (factory) {
      return factory.name || factory.title || `공장 ${factoryId}`;
    }
    // 공장 목록이 없을 때는 ID로 표시
    if (factoryId === 1) return '1공장';
    if (factoryId === 2) return '2공장';
    return item?.Factory?.name || item?.factory?.name || '-';
  };

  const getStorageName = (item) => {
    const storageConditionId = item?.storage_condition_id || item?.storageConditionId || item?.StorageCondition?.id;
    if (storageConditionId) {
      const condition = storageConditions.find(sc => sc.id === storageConditionId);
      if (condition) {
        return condition.name || condition.title || '-';
      }
    }
    return item?.StorageCondition?.name || item?.storageCondition?.name || '-';
  };

  const getWholesalePrice = (item) =>
    item.wholesalePrice ?? item.wholesale_price ?? item.default_wholesale_price ?? null;

  const getTotalQty = (item) =>
    item.total_quantity ?? item.totalQuantity ?? item.aggregate_stock ?? null;

  const categoryOptions = ['원재료', '반재료', '완제품', '소모품'];
  const unitOptions = ['kg', 'g', 'ea', 'box', 'pallet'];
  const factoryOptions = ['1공장', '2공장'];
  const storageOptions = ['냉동', '냉장', '실온'];
  const columnWidths = [
    { width: '20%', key: 'name' },
    { width: '9%', key: 'code' },
    { width: '9%', key: 'category' },
    { width: '9%', key: 'factory' },
    { width: '9%', key: 'storage' },
    { width: '9%', key: 'shelfLife' },
    { width: '9%', key: 'shortage' },
    { width: '9%', key: 'unit' },
    { width: '9%', key: 'price' },
    { width: '8%', key: 'actions' },
  ];

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>등록된 품목 목록</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full table-fixed'>
          <colgroup>
            {columnWidths.map((col) => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>품목명</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>품목코드</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>카테고리</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>담당공장</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>보관조건</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>유통기한</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>최소 보유 갯수</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>단위</th>
              <th className='px-4 py-3 text-right text-sm font-medium text-gray-900'>도매가</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>작업</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {itemsLoading ? (
              <tr>
                <td colSpan={10} className='px-4 py-8 text-center text-sm text-gray-400'>불러오는 중...</td>
              </tr>
            ) : pageData.length > 0 ? (
              pageData.map((item) => {
                const price = getWholesalePrice(item);
                const qty = getTotalQty(item);
                const editing = editingItemId === item.id;
                return (
                  <tr key={item.id} className='transition-colors hover:bg-gray-50/50'>
                    {/* 품목명 -(50자 이하) */}
                    <td className='px-4 py-4 text-sm text-gray-900'>
                      {editing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => handleEditChange("name", e.target.value)}
                          maxLength={50}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                          disabled={itemOperationLoading}
                        />
                      ) : (
                        <div className="truncate" title={item.name}>{item.name}</div>
                      )}
                    </td>
                    {/* 품목코드 - 읽기전용 (10자 미만) */}
                    <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                      {item.code}
                    </td>
                    {/* 카테고리 -(select) */}
                    <td className='px-4 py-4'>
                      {editing ? (
                        <select
                          value={getCategoryName(editForm.category) || editForm.category || ''}
                          onChange={e => {
                            // 한글 값을 영어로 변환하여 저장
                            const selectedKorean = e.target.value;
                            const englishValue = getCategoryValue(selectedKorean);
                            handleEditChange("category", englishValue);
                          }}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                          disabled={itemOperationLoading}
                        >
                          <option value="" disabled hidden>선택</option>
                          {categoryOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700'>
                          {getCategoryName(item.category)}
                        </span>
                      )}
                    </td>
                    {/* 담당공장 -(select) */}
                    <td className='px-4 py-4'>
                      {editing ? (
                        <select
                          value={editForm.factoryId}
                          onChange={e => handleEditChange("factoryId", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                          disabled={itemOperationLoading}
                        >
                          <option value="" disabled hidden>선택</option>
                          {factoriesLoading ? (
                            <option value="" disabled>불러오는 중...</option>
                          ) : (
                            factories.map((factory) => (
                              <option key={factory.id} value={factory.id}>
                                {factory.name || factory.title || `공장 ${factory.id}`}
                              </option>
                            ))
                          )}
                        </select>
                      ) : (
                        <span className='inline-flex items-center gap-1 text-sm text-gray-700'>
                          <div className='text-[#724323]'><Factory className='h-3 w-3' /></div>
                          <span>{getFactoryName(item)}</span>
                        </span>
                      )}
                    </td>
                    {/* 보관조건 */}
                    <td className='px-4 py-4 text-sm text-gray-700'>
                      {editing ? (
                        <select
                          value={editForm.storageConditionId}
                          onChange={e => handleEditChange("storageConditionId", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                          disabled={itemOperationLoading}
                        >
                          <option value="" disabled hidden>선택</option>
                          {storageConditionsLoading ? (
                            <option value="" disabled>불러오는 중...</option>
                          ) : (
                            storageConditions.map((condition) => (
                              <option key={condition.id} value={condition.id}>
                                {condition.name || condition.title || '-'}
                              </option>
                            ))
                          )}
                        </select>
                      ) : (
                        getStorageName(item)
                      )}
                    </td>
                    {/* 유통기한 -(숫자 3글자) */}
                    <td className='px-4 py-4 text-sm text-gray-700'>
                      {editing ? (
                        <input
                          type="number"
                          min={0}
                          max={999}
                          value={editForm.shelfLife}
                          onChange={e => handleEditChange("shelfLife", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-right"
                          disabled={itemOperationLoading}
                        />
                      ) : (
                        item.expiration_date || item.shelfLife || item.shelf_life || '-'
                      )}
                    </td>
                    {/* 최소 보유 갯수 */}
                    <td className='px-4 py-4 text-sm text-gray-700'>
                      {editing ? (
                        <input
                          type="number"
                          min={0}
                          value={editForm.shortage}
                          onChange={e => handleEditChange("shortage", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-right"
                          disabled={itemOperationLoading}
                        />
                      ) : (
                        item.shortage ?? item.shortage_amount ?? '-'
                      )}
                    </td>
                    {/* 단위 -(select - kg, g, ea, box, pallet) */}
                    <td className='px-4 py-4 text-sm text-gray-700'>
                      {editing ? (
                        <select
                          value={editForm.unit}
                          onChange={e => handleEditChange("unit", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
                          disabled={itemOperationLoading}
                        >
                          {unitOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        item.unit
                      )}
                    </td>
                    {/* 도매가 */}
                    <td className='px-4 py-4 text-right text-sm text-gray-700'>
                      {editing ? (
                        <input
                          type="number"
                          min={0}
                          value={editForm.wholesalePrice}
                          onChange={e => handleEditChange("wholesalePrice", e.target.value)}
                          className="w-full rounded border border-gray-200 px-2 py-1 text-xs text-right"
                          disabled={itemOperationLoading}
                        />
                      ) : (
                        price == null ? '-' : Number(price).toLocaleString()
                      )}
                    </td>
                    {/* 작업 */}
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-2'>
                        {editing ? (
                          <>
                            <button
                              className='p-1 text-green-600 hover:text-green-800'
                              disabled={itemOperationLoading}
                              title="저장"
                              onClick={() => handleEditSave(item)}
                            >
                              <Save className='h-4 w-4' />
                            </button>
                            <button
                              className='p-1 text-gray-500 hover:text-gray-700'
                              disabled={itemOperationLoading}
                              title="취소"
                              onClick={handleEditCancel}
                            >
                              <X className='h-4 w-4' />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className='text-gray-500 transition-colors hover:text-[#674529]'
                              onClick={() => handleEditStart(item)}
                              disabled={editingItemId !== null || itemOperationLoading}
                              title="수정"
                            >
                              <Edit className='h-4 w-4' />
                            </button>
                            <button
                              className='text-gray-500 transition-colors hover:text-red-600'
                              onClick={() => handleDelete(item.id)}
                              title="삭제"
                              disabled={editingItemId !== null || itemOperationLoading}
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={10} className='px-4 py-8 text-center text-sm text-gray-400'>데이터가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default BasicItemList;
