import { Factory } from 'lucide-react';

const FactoryInfo = () => {
  const factories = [
    {
      id: 1,
      title: '1공장 (전처리)',
      name: '애니콩 의성 공장',
      address: '경북 의성군 안계면 용기5길 12 애니콩 본사',
      processes: ['원재료 입고', '절단', '세척', '전처리', '농산물 가공'],
    },
    {
      id: 2,
      title: '2공장 (제조)',
      name: '애니콩 상주 공장',
      address: '경북 상주시 냉림1길 66 애니콩 건물 상주지사',
      processes: ['혼합/배합', '조리/제이킹', '포장', '냉동보관'],
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {factories.map((factory) => (
        <div key={factory.id} className='rounded-xl bg-white p-6 shadow-sm'>
          <div className='mb-6 flex items-center gap-2'>
            <Factory className='h-5 w-5 text-[#674529]' />
            <h2 className='text-base text-[#674529]'>{factory.title}</h2>
          </div>

          <div className='space-y-4'>
            {/* 공장명 */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                공장명
              </label>
              <input
                type='text'
                value={factory.name}
                readOnly
                className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900'
              />
            </div>

            {/* 주소 */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                주소
              </label>
              <input
                type='text'
                value={factory.address}
                readOnly
                className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900'
              />
            </div>

            {/* 담당 공정 */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                담당 공정
              </label>
              <div className='flex flex-wrap gap-2'>
                {factory.processes.map((process, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      factory.id === 1
                        ? 'bg-[#a3c478] text-[#fff]'
                        : 'bg-[#f9b679] text-[#fff]'
                    }`}
                  >
                    {process}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FactoryInfo;
