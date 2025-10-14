import { Package, AlertTriangle, Clock, MapPin } from 'lucide-react';

const InventoryStatusSummary = ({ data }) => {
  const summaryCards = [
    {
      id: 1,
      title: '총 품목수',
      value: data?.totalItems || 4,
      icon: <Package className='h-6 w-6' />,
      bgColor: 'bg-[#724323]',
      iconTextColor: 'text-[#fff]',
    },
    {
      id: 2,
      title: '부족 재고',
      value: data?.lowStock || 1,
      icon: <AlertTriangle className='h-6 w-6' />,
      bgColor: 'bg-[#fef9c2]',
      iconTextColor: 'text-[#d08700]',
    },
    {
      id: 3,
      title: '유통기한 임박',
      value: data?.expiringSoon || 1,
      icon: <Clock className='h-6 w-6' />,
      bgColor: 'bg-[#ffedd4]',
      iconTextColor: 'text-[#f65814]',
    },
    {
      id: 4,
      title: '창고 수',
      value: data?.warehouseCount || 3,
      icon: <MapPin className='h-6 w-6' />,
      bgColor: 'bg-[#A3C478]',
      iconTextColor: 'text-[#fff]',
    },
  ];

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
      {summaryCards.map((card) => (
        <div
          key={card.id}
          className='rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='mb-1 text-sm text-gray-600'>{card.title}</p>
              <p className='text-3xl font-bold text-[#674529]'>{card.value}</p>
            </div>
            <div
              className={`h-14 w-14 ${card.bgColor} flex items-center justify-center rounded-xl`}
            >
              <div className={`${card.iconTextColor}`}>{card.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStatusSummary;
