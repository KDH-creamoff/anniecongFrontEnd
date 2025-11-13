import { useSelector } from 'react-redux';
import { Users } from 'lucide-react';

const UserSummaryCards = () => {
  const { users } = useSelector((state) => state.user);

  // 사용자 데이터에서 통계 계산
  const userData = users.data || [];
  const totalUsers = userData.length;
  const productionTeam = userData.filter((user) => user.department === '생산팀').length;
  const managementTeam = userData.filter((user) => user.department === '경영지원팀').length;

  const summaryData = [
    {
      label: '전체 사용자',
      count: totalUsers,
      icon: Users,
      bgColor: 'bg-[#674529]',
      iconColor: 'text-white',
    },
    {
      label: '생산팀',
      count: productionTeam,
      icon: Users,
      bgColor: 'bg-orange-300',
      iconColor: 'text-white',
    },
    {
      label: '경영지원팀',
      count: managementTeam,
      icon: Users,
      bgColor: 'bg-[#86A956]',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
