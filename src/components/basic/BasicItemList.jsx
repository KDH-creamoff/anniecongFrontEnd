import { Package, Edit, Trash2, Clock, Factory } from 'lucide-react';

const BasicItemList = () => {
  const items = [
    {
      code: 'RAW001',
      name: '닭고기 (가슴살)',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '7일',
      unit: 'kg',
    },
    {
      code: 'RAW002',
      name: '양근',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '14일',
      unit: 'kg',
    },
    {
      code: 'WIP001',
      name: '전처리 믹스',
      category: 'WIP',
      categoryColor: 'bg-[#f9b679] text-white',
      factory: '2공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '3일',
      unit: 'kg',
    },
    {
      code: 'FG001',
      name: '애니콩 펫베이커리 A',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '30일',
      unit: 'ea',
    },
  ];

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>등록된 품목 목록</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                품목코드
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                품목명
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                카테고리
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                담당공장
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                보관조건
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                유통기한
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                단위
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                작업
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {items.map((item, index) => (
              <tr key={index} className='transition-colors hover:bg-gray-50/50'>
                <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                  {item.code}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>{item.name}</td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span className='inline-flex items-center gap-1 text-sm text-gray-700'>
                    <div className='text-[#724323]'>
                      <Factory />
                    </div>
                    <span>{item.factory}</span>
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${item.storageColor}`}
                  >
                    <span>{item.storageIcon}</span>
                    <span>{item.storage}</span>
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span className='inline-flex items-center gap-1 text-sm text-gray-700'>
                    <Clock className='h-4 w-4 text-gray-500' />
                    <span>{item.shelfLife}</span>
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>{item.unit}</td>
                <td className='px-4 py-4'>
                  <div className='flex items-center gap-2'>
                    <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                      <Edit className='h-4 w-4' />
                    </button>
                    <button className='text-gray-500 transition-colors hover:text-red-600'>
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasicItemList;
