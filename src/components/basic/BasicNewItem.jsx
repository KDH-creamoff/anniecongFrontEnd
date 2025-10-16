import { useState } from 'react';
import { Plus } from 'lucide-react';

const BasicNewItem = () => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    factory: '',
    storage: '',
    shelfLife: '',
    unit: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 품목 코드 검증
    if (!formData.code) {
      newErrors.code = '품목 코드를 입력해주세요';
    }

    // 품목명 검증
    if (!formData.name) {
      newErrors.name = '품목명을 입력해주세요';
    }

    // 카테고리 검증
    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요';
    }

    // 담당공장 검증
    if (!formData.factory) {
      newErrors.factory = '담당공장을 선택해주세요';
    }

    // 보관조건 검증
    if (!formData.storage) {
      newErrors.storage = '보관조건을 입력해주세요';
    }

    // 유통기한 검증
    if (!formData.shelfLife) {
      newErrors.shelfLife = '유통기한을 입력해주세요';
    }

    // 단위 검증
    if (!formData.unit) {
      newErrors.unit = '단위를 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('품목 등록:', formData);
      // 등록 성공 후 초기화
      setFormData({
        code: '',
        name: '',
        category: '',
        factory: '',
        storage: '',
        shelfLife: '',
        unit: '',
      });
      alert('품목이 성공적으로 등록되었습니다!');
    }
  };

  return (
    <div className='mb-6 rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Plus className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>신규 품목 등록</h2>
      </div>

      <div className='space-y-5'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-1'>
          {/* 품목명 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              품목명
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              maxLength={50}
              placeholder='품목명 입력'
              className={`w-full rounded-xl border ${
                errors.name ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            />
            {errors.name && (
              <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {/* 품목코드 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              품목코드
            </label>
            <input
              type='text'
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              maxLength={9}
              placeholder='RAW001'
              className={`w-full rounded-xl border ${
                errors.code ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            />
            {errors.code && (
              <p className='mt-1 text-xs text-red-500'>{errors.code}</p>
            )}
          </div>
          {/* 카테고리 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              카테고리
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full cursor-pointer appearance-none rounded-xl border ${
                errors.category ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            >
              <option value=''>카테고리 선택</option>
              <option value='원재료'>원재료</option>
              <option value='반재료'>반재료</option>
              <option value='완제품'>완제품</option>
              <option value='소모품'>소모품</option>
            </select>
            {errors.category && (
              <p className='mt-1 text-xs text-red-500'>{errors.category}</p>
            )}
          </div>

          {/* 담당공장 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              담당공장
            </label>
            <select
              value={formData.factory}
              onChange={(e) => handleInputChange('factory', e.target.value)}
              className={`w-full cursor-pointer appearance-none rounded-xl border ${
                errors.factory ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            >
              <option value=''>공장 선택</option>
              <option value='1공장'>1공장</option>
              <option value='2공장'>2공장</option>
            </select>
            {errors.factory && (
              <p className='mt-1 text-xs text-red-500'>{errors.factory}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          {/* 보관조건 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              보관조건
            </label>
            <input
              type='text'
              value={formData.storage}
              onChange={(e) => handleInputChange('storage', e.target.value)}
              maxLength={4}
              placeholder='보관조건'
              className={`w-full rounded-xl border ${
                errors.storage ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            />
            {errors.storage && (
              <p className='mt-1 text-xs text-red-500'>{errors.storage}</p>
            )}
          </div>

          {/* 유통기한 (일) */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              유통기한 (일)
            </label>
            <input
              type='number'
              value={formData.shelfLife}
              onChange={(e) => handleInputChange('shelfLife', e.target.value)}
              maxLength={3}
              placeholder='7'
              className={`w-full rounded-xl border ${
                errors.shelfLife ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            />
            {errors.shelfLife && (
              <p className='mt-1 text-xs text-red-500'>{errors.shelfLife}</p>
            )}
          </div>

          {/* 단위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              단위
            </label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className={`w-full cursor-pointer appearance-none rounded-xl border ${
                errors.unit ? 'border-red-300' : 'border-gray-100'
              } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
            >
              <option value=''>단위</option>
              <option value='kg'>kg</option>
              <option value='g'>g</option>
              <option value='ea'>ea</option>
              <option value='box'>box</option>
              <option value='pallet'>pallet</option>
            </select>
            {errors.unit && (
              <p className='mt-1 text-xs text-red-500'>{errors.unit}</p>
            )}
          </div>

          {/* 등록 버튼 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              &nbsp;
            </label>
            <button
              onClick={handleSubmit}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#674529] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95'
            >
              <span>등록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicNewItem;
