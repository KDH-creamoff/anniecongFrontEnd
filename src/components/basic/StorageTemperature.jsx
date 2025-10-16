import { Thermometer, X, Plus } from 'lucide-react';

const StorageTemperature = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {/* 상온 보관 */}
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center gap-2'>
          <Thermometer className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>상온 보관</h2>
        </div>

        <div className='space-y-4'>
          {/* 온도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              온도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              15°C - 25°C
            </div>
          </div>

          {/* 습도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              습도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              40% - 60%
            </div>
          </div>

          {/* 적용 품목 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              적용 품목
            </label>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                건조 식료
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                포장재
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <button
                className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                aria-label='품목 추가'
              >
                <Plus className='h-4 w-4 text-gray-600' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 냉장 보관 */}
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center gap-2'>
          <Thermometer className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>냉장 보관</h2>
        </div>

        <div className='space-y-4'>
          {/* 온도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              온도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              0°C - 4°C
            </div>
          </div>

          {/* 습도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              습도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              85% - 95%
            </div>
          </div>

          {/* 적용 품목 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              적용 품목
            </label>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                신선 육류
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                야채류
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                반제품
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <button
                className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                aria-label='품목 추가'
              >
                <Plus className='h-4 w-4 text-gray-600' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 냉동 보관 */}
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center gap-2'>
          <Thermometer className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>냉동 보관</h2>
        </div>

        <div className='space-y-4'>
          {/* 온도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              온도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              -18°C 이하
            </div>
          </div>

          {/* 습도 범위 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              습도 범위
            </label>
            <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
              N/A
            </div>
          </div>

          {/* 적용 품목 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              적용 품목
            </label>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                완제품
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'>
                냉동 육류
                <X className='h-3 w-3 cursor-pointer hover:opacity-80' />
              </span>
              <button
                className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                aria-label='품목 추가'
              >
                <Plus className='h-4 w-4 text-gray-600' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTemperature;
