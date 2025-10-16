import { useState } from 'react';
import { Package, Edit, Trash2, Clock, Factory } from 'lucide-react';
import Pagination from '../common/Pagination';

const BasicItemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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
      name: '당근',
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
      code: 'RAW003',
      name: '양파',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '21일',
      unit: 'kg',
    },
    {
      code: 'RAW004',
      name: '감자',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '30일',
      unit: 'kg',
    },
    {
      code: 'RAW005',
      name: '대파',
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
      code: 'RAW006',
      name: '마늘',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '60일',
      unit: 'kg',
    },
    {
      code: 'RAW007',
      name: '생강',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '45일',
      unit: 'kg',
    },
    {
      code: 'RAW008',
      name: '간장',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '365일',
      unit: 'L',
    },
    {
      code: 'RAW009',
      name: '설탕',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '730일',
      unit: 'kg',
    },
    {
      code: 'RAW010',
      name: '참기름',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '180일',
      unit: 'L',
    },
    {
      code: 'RAW011',
      name: '소금',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '1095일',
      unit: 'kg',
    },
    {
      code: 'RAW012',
      name: '후추',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '365일',
      unit: 'kg',
    },
    {
      code: 'RAW013',
      name: '고춧가루',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '180일',
      unit: 'kg',
    },
    {
      code: 'RAW014',
      name: '식용유',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '365일',
      unit: 'L',
    },
    {
      code: 'RAW015',
      name: '돼지고기 (삼겹살)',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '5일',
      unit: 'kg',
    },
    {
      code: 'RAW016',
      name: '소고기 (불고기용)',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '5일',
      unit: 'kg',
    },
    {
      code: 'RAW017',
      name: '두부',
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
      code: 'RAW018',
      name: '배추',
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
      code: 'RAW019',
      name: '무',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '21일',
      unit: 'kg',
    },
    {
      code: 'RAW020',
      name: '애호박',
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
      name: '전처리 믹스 A',
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
      code: 'WIP002',
      name: '전처리 믹스 B',
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
      code: 'WIP003',
      name: '반가공 치킨 믹스',
      category: 'WIP',
      categoryColor: 'bg-[#f9b679] text-white',
      factory: '2공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '2일',
      unit: 'kg',
    },
    {
      code: 'WIP004',
      name: '반가공 소고기 믹스',
      category: 'WIP',
      categoryColor: 'bg-[#f9b679] text-white',
      factory: '2공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '2일',
      unit: 'kg',
    },
    {
      code: 'WIP005',
      name: '반가공 채소 믹스',
      category: 'WIP',
      categoryColor: 'bg-[#f9b679] text-white',
      factory: '2공장',
      storage: '냉장',
      storageColor: 'bg-blue-100 text-blue-700',
      storageIcon: '❄️',
      shelfLife: '2일',
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
    {
      code: 'FG002',
      name: '애니콩 펫베이커리 B',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '30일',
      unit: 'ea',
    },
    {
      code: 'FG003',
      name: '애니콩 펫베이커리 C',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '30일',
      unit: 'ea',
    },
    {
      code: 'FG004',
      name: '애니콩 펫베이커리 D',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '30일',
      unit: 'ea',
    },
    {
      code: 'FG005',
      name: '애니콩 펫베이커리 E',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '30일',
      unit: 'ea',
    },
    {
      code: 'FG006',
      name: '애니콩 펫디너 치킨',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '45일',
      unit: 'ea',
    },
    {
      code: 'FG007',
      name: '애니콩 펫디너 비프',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '45일',
      unit: 'ea',
    },
    {
      code: 'FG008',
      name: '애니콩 펫디너 포크',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '45일',
      unit: 'ea',
    },
    {
      code: 'FG009',
      name: '애니콩 펫스낵 치킨',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '60일',
      unit: 'ea',
    },
    {
      code: 'FG010',
      name: '애니콩 펫스낵 비프',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '60일',
      unit: 'ea',
    },
    {
      code: 'RAW021',
      name: '버섯 (표고)',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '10일',
      unit: 'kg',
    },
    {
      code: 'RAW022',
      name: '버섯 (양송이)',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '10일',
      unit: 'kg',
    },
    {
      code: 'RAW023',
      name: '파프리카 (빨강)',
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
      code: 'RAW024',
      name: '파프리카 (노랑)',
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
      code: 'RAW025',
      name: '브로콜리',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '10일',
      unit: 'kg',
    },
    {
      code: 'RAW026',
      name: '양배추',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '21일',
      unit: 'kg',
    },
    {
      code: 'RAW027',
      name: '청경채',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '10일',
      unit: 'kg',
    },
    {
      code: 'RAW028',
      name: '시금치',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '7일',
      unit: 'kg',
    },
    {
      code: 'RAW029',
      name: '숙주',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '5일',
      unit: 'kg',
    },
    {
      code: 'RAW030',
      name: '콩나물',
      category: '원재료',
      categoryColor: 'bg-green-100 text-green-700',
      factory: '1공장',
      storage: '냉온',
      storageColor: 'bg-yellow-100 text-yellow-700',
      storageIcon: '🌡️',
      shelfLife: '5일',
      unit: 'kg',
    },
    {
      code: 'WIP006',
      name: '전처리 믹스 C',
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
      code: 'WIP007',
      name: '전처리 믹스 D',
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
      code: 'FG011',
      name: '애니콩 펫트릿 믹스',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '90일',
      unit: 'ea',
    },
    {
      code: 'FG012',
      name: '애니콩 펫밀 스페셜',
      category: '완제품',
      categoryColor: 'bg-[#724323] text-white',
      factory: '2공장',
      storage: '냉동',
      storageColor: 'bg-purple-200 text-purple-700',
      storageIcon: '🧊',
      shelfLife: '90일',
      unit: 'ea',
    },
  ];

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

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
            {currentItems.map((item, index) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BasicItemList;
