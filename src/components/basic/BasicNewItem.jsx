import { Plus } from 'lucide-react';

const BasicNewItem = () => {
  return (
    <div className='mb-6 rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Plus className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>신규 품목 등록</h2>
      </div>

      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* 품목코드 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            품목코드
          </label>
          <input
            type='text'
            placeholder='RAW001'
            className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'
          />
        </div>

        {/* 품목명 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            품목명
          </label>
          <input
            type='text'
            placeholder='품목명 입력'
            className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            카테고리
          </label>
          <select className='w-full cursor-pointer appearance-none rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'>
            <option>카테고리 선택</option>
            <option>원재료</option>
            <option>반제품</option>
            <option>완제품</option>
            <option>소모품</option>
          </select>
        </div>

        {/* 담당공장 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            담당공장
          </label>
          <select className='w-full cursor-pointer appearance-none rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'>
            <option>공장 선택</option>
            <option>1공장</option>
            <option>2공장</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* 보관조건 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            보관조건
          </label>
          <select className='w-full cursor-pointer appearance-none rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'>
            <option>보관조건</option>
            <option>냉장</option>
            <option>냉동</option>
            <option>상온</option>
          </select>
        </div>

        {/* 유통기한 (일) */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            유통기한 (일)
          </label>
          <input
            type='text'
            placeholder='7'
            className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'
          />
        </div>

        {/* 단위 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            단위
          </label>
          <select className='w-full cursor-pointer appearance-none rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900 focus:border-transparent focus:outline-none'>
            <option>단위</option>
            <option>g</option>
            <option>kg</option>
            <option>ea</option>
            <option>box</option>
            <option>pallet</option>
          </select>
        </div>

        {/* 등록 버튼 */}
        <div className='flex items-end'>
          <button className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#674529] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#553821]'>
            <Plus className='h-4 w-4' />
            <span>등록</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicNewItem;
