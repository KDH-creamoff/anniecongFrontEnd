import { MapPin } from 'lucide-react';

const WarehouseUtilization = () => {
  const warehouses = [
    {
      name: 'P1-RM',
      percentage: 60,
      status: '보관 품목',
      count: '2개',
      note: '여유 공간 충분',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'P2-WIP',
      percentage: 88,
      status: '보관 품목',
      count: '1개',
      note: '창고 포화 주의',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
    {
      name: 'P2-FG',
      percentage: 97,
      status: '보관 품목',
      count: '1개',
      note: '창고 포화 주의',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className='mt-6 rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <MapPin className='h-5 w-5 text-[#674529]' />
        <h2 className='text-lg text-[#674529]'>창고별 이용률</h2>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {warehouses.map((warehouse, index) => (
          <div key={index} className='rounded-lg border border-gray-200 p-4'>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-[#674529]'>
                {warehouse.name}
              </h3>
              <span
                className={`rounded px-3 py-1 text-sm font-semibold ${warehouse.bgColor} ${warehouse.percentage >= 85 ? 'text-red-600' : 'text-green-600'}`}
              >
                {warehouse.percentage}%
              </span>
            </div>

            <div className='mb-3'>
              <div className='mb-2 flex justify-between text-sm text-gray-600'>
                <span>{warehouse.status}</span>
                <span className='font-semibold text-gray-900'>
                  {warehouse.count}
                </span>
              </div>
              <div className='h-2 w-full rounded-full bg-gray-200'>
                <div
                  className={`h-2 rounded-full ${warehouse.color}`}
                  style={{ width: `${warehouse.percentage}%` }}
                ></div>
              </div>
            </div>

            <p className='text-sm text-gray-500'>{warehouse.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseUtilization;
