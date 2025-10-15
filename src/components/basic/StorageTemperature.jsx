import { Thermometer } from 'lucide-react';

const StorageTemperature = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <div className='flex items-center gap-2 rounded-xl bg-white p-6 text-[#674529] shadow-sm'>
        <Thermometer className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>상온 보관</h2>
      </div>
      <div className='flex items-center gap-2 rounded-xl bg-white p-6 text-[#674529] shadow-sm'>
        <Thermometer className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>냉장 보관</h2>
      </div>
      <div className='flex items-center gap-2 rounded-xl bg-white p-6 text-[#674529] shadow-sm'>
        <Thermometer className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>냉동 보관</h2>
      </div>
    </div>
  );
};

export default StorageTemperature;
