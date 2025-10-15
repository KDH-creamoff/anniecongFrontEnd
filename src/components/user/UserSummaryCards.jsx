import { Users, CheckCircle2 } from 'lucide-react';

const UserSummaryCards = () => {
  const summaryData = [
    {
      label: '전체 사용자',
      count: 5,
      icon: Users,
      bgColor: 'bg-[#674529]',
      iconColor: 'text-white',
    },
    {
      label: '활성 사용자',
      count: 4,
      icon: CheckCircle2,
      bgColor: 'bg-[#86A956]',
      iconColor: 'text-white',
    },
    {
      label: '1공장 사용자',
      count: 2,
      icon: Users,
      bgColor: 'bg-[#A8B86C]',
      iconColor: 'text-white',
    },
    {
      label: '2공장 사용자',
      count: 2,
      icon: Users,
      bgColor: 'bg-[#E29D4D]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {summaryData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className='flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm'
          >
            <div>
              <p className='mb-1 text-sm text-gray-600'>{item.label}</p>
              <p className='text-2xl font-bold text-gray-900'>{item.count}</p>
            </div>
            <div className={`rounded-xl ${item.bgColor} p-3`}>
              <Icon className={`h-6 w-6 ${item.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserSummaryCards;
