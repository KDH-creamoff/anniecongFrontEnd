import React from 'react';
import { Package } from 'lucide-react';

const BOMManagement = () => {
  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>
          BOM (Bill of Materials) 관리
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료 코드
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료명
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                필요량
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                단위당 소요량
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default BOMManagement;
