import { Thermometer, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStorageConditions, addStorageConditionItems, removeStorageConditionItem } from '../../store/modules/basic/actions';
import {
  selectStorageConditions,
  selectStorageConditionsLoading,
  selectStorageOperation,
} from '../../store/modules/basic/selectors';

const StorageTemperature = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 보관 조건 데이터 가져오기 (셀렉터 사용)
  const storageConditions = useSelector(selectStorageConditions);
  const loading = useSelector(selectStorageConditionsLoading);
  const storageOperation = useSelector(selectStorageOperation);

  // 컴포넌트 마운트 시 보관 조건 목록 조회
  useEffect(() => {
    dispatch(fetchStorageConditions.request());
  }, [dispatch]);

  // 보관 조건 업데이트/추가/제거 성공 시 목록 다시 조회
  useEffect(() => {
    if (storageOperation?.data) {
      dispatch(fetchStorageConditions.request());
    }
  }, [storageOperation, dispatch]);

  // 적용 품목 추가 성공 시 목록 다시 조회
  const addItemsOperation = useSelector((state) => state.basic.addStorageConditionItems);
  useEffect(() => {
    if (addItemsOperation?.data) {
      dispatch(fetchStorageConditions.request());
    }
  }, [addItemsOperation, dispatch]);

  // 적용 품목 제거 성공 시 목록 다시 조회
  const removeItemOperation = useSelector((state) => state.basic.removeStorageConditionItem);
  useEffect(() => {
    if (removeItemOperation?.data) {
      dispatch(fetchStorageConditions.request());
    }
  }, [removeItemOperation, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStorageId, setCurrentStorageId] = useState(null);
  const [itemNamesInput, setItemNamesInput] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = (storageId) => {
    setCurrentStorageId(storageId);
    setIsModalOpen(true);
    setItemNamesInput('');
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStorageId(null);
    setItemNamesInput('');
    setError('');
  };

  const handleAddItems = () => {
    if (!itemNamesInput.trim()) {
      setError('품목 이름을 입력해주세요');
      return;
    }

    // 쉼표로 구분된 품목 이름들을 배열로 변환하고 중복 제거 (띄어쓰기 무시)
    const trimmedNames = itemNamesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    const seen = new Set();
    const itemNames = [];
    for (const name of trimmedNames) {
      const key = name.replace(/\s+/g, ''); // 공백 제거한 버전
      if (!seen.has(key)) {
        seen.add(key);
        itemNames.push(name); // 원본 형태 유지
      }
    }

    if (itemNames.length === 0) {
      setError('품목 이름을 입력해주세요');
      return;
    }

    // 현재 보관 조건의 기존 품목 목록 가져오기
    const currentStorage = storageConditions.find(sc => sc.id === currentStorageId);
    const existingItems = currentStorage 
      ? parseApplicableItems(currentStorage.applicable_items || currentStorage.items)
      : [];

    // 중복 체크
    const duplicates = itemNames.filter(itemName => 
      existingItems.some(existing => existing.trim() === itemName.trim())
    );

    if (duplicates.length > 0) {
      setError(`이미 등록된 품목입니다: ${duplicates.join(', ')}`);
      return;
    }

    // Redux Saga 액션 dispatch (itemNames 사용)
    dispatch(addStorageConditionItems.request({
      storageConditionId: currentStorageId,
      itemNames: itemNames,
    }));

    handleCloseModal();
  };

  const handleRemoveItem = (storageId, itemName) => {
    if (!itemName) {
      console.warn('품목 이름이 없습니다.');
      return;
    }

    if (window.confirm(`"${itemName}"을(를) 제거하시겠습니까?`)) {
      // Redux Saga 액션 dispatch
      dispatch(removeStorageConditionItem.request({
        storageConditionId: storageId,
        itemName: itemName,
      }));
    }
  };

  // applicable_items 문자열을 배열로 변환하는 헬퍼 함수
  const parseApplicableItems = (applicableItems) => {
    if (!applicableItems) return [];
    if (typeof applicableItems === 'string') {
      // 쉼표와 공백으로 구분된 문자열을 배열로 변환
      return applicableItems.split(', ').filter(item => item.trim().length > 0);
    }
    if (Array.isArray(applicableItems)) {
      return applicableItems;
    }
    return [];
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='p-4 text-center text-sm text-gray-600'>불러오는 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {storageConditions.map((storage) => (
          <div key={storage.id} className='rounded-xl bg-white p-6 shadow-sm'>
            <div className='mb-4 flex items-center gap-2'>
              <Thermometer className='h-5 w-5 text-[#674529]' />
              <h2 className='text-base text-[#674529]'>{storage.name || storage.title || ''}</h2>
            </div>

            <div className='space-y-4'>
              {/* 온도 범위 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  온도 범위
                </label>
                <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
                  {storage.temperature_range || storage.temperature || ''}
                </div>
              </div>

              {/* 적용 품목 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  적용 품목
                </label>
                <div className='flex flex-wrap items-center gap-2'>
                  {parseApplicableItems(storage.applicable_items || storage.items).map((itemName, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'
                    >
                      {itemName}
                      <X
                        className='h-3 w-3 cursor-pointer hover:opacity-80'
                        onClick={() => handleRemoveItem(storage.id, itemName)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => handleOpenModal(storage.id)}
                    className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                    aria-label='품목 추가'
                  >
                    <Plus className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 품목 추가 모달 */}
      {isModalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
          onClick={handleCloseModal}
        >
          <div
            className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Plus className='h-5 w-5 text-[#674529]' />
                <h3 className='text-lg font-semibold text-[#674529]'>품목 추가</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className='rounded-lg p-1 transition-colors hover:bg-gray-100'
                aria-label='닫기'
              >
                <X className='h-5 w-5 text-gray-500' />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  품목 이름 (쉼표로 구분)
                </label>
                <input
                  type='text'
                  value={itemNamesInput}
                  onChange={(e) => {
                    setItemNamesInput(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder='예: 신선 육류, 신선 채소류, 반제품'
                  className={`w-full rounded-xl border ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:outline-none focus:ring-2 focus:ring-[#674529]`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddItems();
                  }}
                />
                <p className='mt-1 text-xs text-gray-500'>
                  품목 이름을 쉼표로 구분하여 입력하세요. 중복된 품목은 자동으로 제외됩니다.
                </p>
                {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={handleCloseModal}
                  className='flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95'
                >
                  취소
                </button>
                <button
                  onClick={handleAddItems}
                  className='flex-1 rounded-xl bg-[#674529] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95'
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StorageTemperature;