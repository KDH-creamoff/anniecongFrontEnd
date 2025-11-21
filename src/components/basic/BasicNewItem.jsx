import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { createItem, fetchStorageConditions, fetchItems } from '../../store/modules/basic/actions';
import {
  selectItemOperation,
  selectItemOperationLoading,
  selectItemOperationError,
  selectStorageConditions,
  selectStorageConditionsLoading,
  selectFactories,
  selectFactoriesLoading,
} from '../../store/modules/basic/selectors';

const BasicNewItem = () => {
  const dispatch = useDispatch();

  // Redux 상태 조회
  const itemOperation = useSelector(selectItemOperation);
  const itemOperationLoading = useSelector(selectItemOperationLoading);
  const itemOperationError = useSelector(selectItemOperationError);
  const storageConditions = useSelector(selectStorageConditions) || [];
  const storageConditionsLoading = useSelector(selectStorageConditionsLoading);
  const factories = useSelector(selectFactories) || [];
  const factoriesLoading = useSelector(selectFactoriesLoading);

  const initialFormData = {
    code: '',
    name: '',
    category: '',
    factoryId: '',
    storageConditionId: '',
    storageTemp: '', // 보관 조건 name 저장
    shelfLife: '',
    shortage: '',
    unit: '',
    wholesalePrice: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // 컴포넌트 마운트 시 보관 조건 목록 조회
  useEffect(() => {
    console.log('BasicNewItem 컴포넌트 마운트됨');
    dispatch(fetchStorageConditions.request());
  }, [dispatch]);
  
  // handleSubmit 함수가 제대로 정의되었는지 확인
  useEffect(() => {
    console.log('handleSubmit 함수 확인:', typeof handleSubmit);
  }, []);

  useEffect(() => {
    if (itemOperationError) {
      alert(itemOperationError || '등록 중 오류가 발생했습니다.');
    }
  }, [itemOperationError]);

  // 품목 등록 성공 시 리스트 업데이트 + 폼 초기화 + 알림
  useEffect(() => {
    if (itemOperation && !itemOperationLoading && !itemOperationError) {
      dispatch(fetchItems.request());
      setFormData(initialFormData);
      setErrors({});
      alert('품목이 성공적으로 등록되었습니다!');
    }
  }, [itemOperation, itemOperationLoading, itemOperationError, dispatch]);

  const handleInputChange = (field, value) => {
    if (field === 'storageConditionId') {
      const selectedStorage = storageConditions.find(
        (sc) => String(sc.id) === String(value)
      );

      // 🔥 여기가 핵심 수정 부분
      // 예: "냉장(0~5도)" → "냉장" 만 잘라서 storageTemp에 저장
      let storageTemp = selectedStorage?.name || '';

      if (typeof storageTemp === 'string') {
        // 괄호 앞까지만 사용
        storageTemp = storageTemp.split('(')[0].trim();
        // 혹시 너무 길면 안전하게 한 번 더 자르기 (DB 컬럼 길이 대비)
        if (storageTemp.length > 20) {
          storageTemp = storageTemp.slice(0, 20);
        }
      }

      setFormData((prev) => ({ 
        ...prev, 
        storageConditionId: value,
        storageTemp,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = '품목 코드를 입력해주세요';
    else if (formData.code.length >= 10) newErrors.code = '품목 코드는 10자 미만이어야 합니다';
    if (!formData.name) newErrors.name = '품목명을 입력해주세요';
    else if (formData.name.length > 50) newErrors.name = '품목명은 50자 이하여야 합니다';
    if (!formData.category) newErrors.category = '카테고리를 선택해주세요';
    if (!formData.factoryId) newErrors.factoryId = '담당공장을 선택해주세요';
    if (!formData.storageConditionId) newErrors.storageConditionId = '보관조건을 선택해주세요';
    if (!formData.shelfLife) newErrors.shelfLife = '유통기한을 입력해주세요';
    else if (formData.shelfLife > 999) newErrors.shelfLife = '유통기한은 3자리 이하여야 합니다';
    if (!formData.shortage) newErrors.shortage = '최소 보유 개수를 입력해주세요';
    if (!formData.unit) newErrors.unit = '단위를 선택해주세요';
    if (
      formData.wholesalePrice === '' ||
      Number.isNaN(Number(formData.wholesalePrice))
    ) {
      newErrors.wholesalePrice = '도매가격(원)을 숫자로 입력해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const normUnit = (v) => {
    const m = { kg: 'kg', g: 'g', ea: 'ea', box: 'box', pallet: 'pallet' };
    return m[String(v).trim().toLowerCase()] || v;
  };

  const handleSubmit = () => {
    console.log('handleSubmit 호출됨');
    console.log('itemOperationLoading:', itemOperationLoading);
    console.log('formData:', formData);
    
    if (itemOperationLoading) {
      console.log('로딩 중이므로 리턴');
      return;
    }
    
    if (!validateForm()) {
      console.log('유효성 검사 실패');
      return;
    }

    const storageConditionId = Number(formData.storageConditionId);
    const storageTemp = formData.storageTemp;
    
    console.log('=== 등록 버튼 클릭 ===');
    console.log('storage_condition_id:', storageConditionId);
    console.log('storage_temp:', storageTemp);
    console.log('===================');

    dispatch(
      createItem.request({
        code: formData.code.trim(),
        name: formData.name.trim(),
        category: formData.category,
        factoryId: Number(formData.factoryId),
        storageConditionId: storageConditionId,
        storageTemp: storageTemp,
        shelfLife: Number(formData.shelfLife),
        shortage: Number(formData.shortage),
        unit: normUnit(formData.unit),
        wholesalePrice: Number(formData.wholesalePrice),
      })
    );
  };

  const factorySelect = useMemo(() => {
    return (
      <>
        <option value="" disabled hidden>공장 선택</option>
        {factoriesLoading ? ( 
          <option value="" disabled>불러오는 중...</option>
        ) : (
          factories.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name || f.title || '-'}
            </option>
          ))
        )}       
      </>
    );
  }, [factories, factoriesLoading]);

  const storageSelect = useMemo(() => {
    return (
      <>
        <option value="" disabled hidden>보관조건 선택</option>
        {storageConditionsLoading ? (
          <option value="" disabled>불러오는 중...</option>
        ) : (
          storageConditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.name || condition.title || '-'}
            </option>
          ))
        )}
      </>
    );
  }, [storageConditions, storageConditionsLoading]);

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Plus className="h-5 w-5 text-[#674529]" />
        <h2 className="text-base text-[#674529]">신규 품목 등록</h2>
      </div>

      <div className="space-y-5">
        {/* 품목명 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">품목명</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            maxLength={50}
            placeholder="품목명 입력"
            className={`w-full rounded-xl border ${
              errors.name ? 'border-red-300' : 'border-gray-100'
            } bg-gray-100 px-4 py-2.5 text-sm`}
            disabled={itemOperationLoading}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* 코드 - 10자 미만 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">품목코드</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              maxLength={9}
              placeholder="예: RAW0001"
              className={`w-full rounded-xl border ${
                errors.code ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            />
            {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
          </div>

          {/* 카테고리 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full rounded-xl border ${
                errors.category ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            >
              <option value="" disabled hidden>카테고리 선택</option>
              <option value="원재료">원재료</option>
              <option value="반재료">반재료</option>
              <option value="완제품">완제품</option>
              <option value="소모품">소모품</option>
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          {/* 담당공장 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">담당공장</label>
            <select
              value={formData.factoryId}
              onChange={(e) => handleInputChange('factoryId', e.target.value)}
              className={`w-full rounded-xl border ${
                errors.factoryId ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            >
              {factorySelect}
            </select>
            {errors.factoryId && <p className="mt-1 text-xs text-red-500">{errors.factoryId}</p>}
          </div>

          {/* 보관조건 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">보관조건</label>
            <select
              value={formData.storageConditionId}
              onChange={(e) => handleInputChange('storageConditionId', e.target.value)}
              className={`w-full rounded-xl border ${
                errors.storageConditionId ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            >
              {storageSelect}
            </select>
            {errors.storageConditionId && (
              <p className="mt-1 text-xs text-red-500">{errors.storageConditionId}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* 유통기한(일) - 숫자 3글자 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">유통기한 (일)</label>
            <input
              type="number"
              min={0}
              max={999}
              value={formData.shelfLife}
              onChange={(e) => handleInputChange('shelfLife', e.target.value)}
              placeholder="예: 7"
              className={`w-full rounded-xl border ${
                errors.shelfLife ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            />
            {errors.shelfLife && (
              <p className='mt-1 text-xs text-red-500'>{errors.shelfLife}</p>
            )}
          </div>

          {/* 최소 보유 개수 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">최소 보유 개수</label>
            <input
              type="number"
              value={formData.shortage}
              onChange={(e) => handleInputChange('shortage', e.target.value)}
              placeholder="예: 100"
              className={`w-full rounded-xl border ${
                errors.shortage ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            />
            {errors.shortage && <p className="mt-1 text-xs text-red-500">{errors.shortage}</p>}
          </div>

          {/* 단위 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">단위</label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className={`w-full rounded-xl border ${
                errors.unit ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            >
              <option value="" disabled hidden>단위</option>
              <option value='kg'>kg</option>
              <option value='g'>g</option>
              <option value='ea'>ea</option>
              <option value='box'>box</option>
              <option value='pallet'>pallet</option>
            </select>
            {errors.unit && <p className="mt-1 text-xs text-red-500">{errors.unit}</p>}
          </div>

          {/* 도매가(원) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">도매가 (원)</label>
            <input
              type="number"
              value={formData.wholesalePrice}
              onChange={(e) => handleInputChange('wholesalePrice', e.target.value)}
              placeholder="예: 2500"
              className={`w-full rounded-xl border ${
                errors.wholesalePrice ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm`}
              disabled={itemOperationLoading}
            />
            {errors.wholesalePrice && (
              <p className="mt-1 text-xs text-red-500">{errors.wholesalePrice}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div />
          <div />
          <div />
          {/* 등록 버튼 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">&nbsp;</label>
            <button
              type="button"
              disabled={itemOperationLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#674529] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95 disabled:opacity-60"
            >
              <span>{itemOperationLoading ? '등록중…' : '등록'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicNewItem;
