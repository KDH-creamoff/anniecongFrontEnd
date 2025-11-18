import {
  TrendingUp,
  TrendingDown,
  Truck,
  Factory,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManufacturingStats } from '../../store/modules/dash/actions';
import {
  selectManufacturingStatsData,
  selectManufacturingStatsLoading,
} from '../../store/modules/dash/selectors';

const ManufacturingManagement = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 통계 데이터 가져오기
  const statsData = useSelector(selectManufacturingStatsData);
  const loading = useSelector(selectManufacturingStatsLoading);

  // 컴포넌트 마운트 시 통계 데이터 조회
  useEffect(() => {
    dispatch(getManufacturingStats.request());
  }, [dispatch]);

  // 로딩 중일 때
  if (loading) {
    return (
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='p-4 text-center text-sm text-gray-600'>불러오는 중...</div>
      </div>
    );
  }

  // 통계 데이터가 없을 때
  if (!statsData) {
    return null;
  }

  // 통계 데이터를 UI 형식에 맞게 변환
  const stats = [
    {
      title: '입고 완료',
      value: `${statsData.receivingCompleted.value}건`,
      change: `${statsData.receivingCompleted.change > 0 ? '+' : ''}${statsData.receivingCompleted.change}%`,
      isPositive: statsData.receivingCompleted.isPositive,
      icon: Truck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: '제조 완료',
      value: `${statsData.productionCompleted.value}건`,
      change: `${statsData.productionCompleted.change > 0 ? '+' : ''}${statsData.productionCompleted.change}%`,
      isPositive: statsData.productionCompleted.isPositive,
      icon: Factory,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: '출고 완료',
      value: `${statsData.shippingCompleted.value}건`,
      change: `${statsData.shippingCompleted.change > 0 ? '+' : ''}${statsData.shippingCompleted.change}%`,
      isPositive: statsData.shippingCompleted.isPositive,
      icon: Package,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: '재고 알람',
      value: `${statsData.inventoryAlerts.value}건`,
      change: `${statsData.inventoryAlerts.change}건`,
      isPositive: statsData.inventoryAlerts.isPositive,
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: '유통기한 임박',
      value: `${statsData.expiryAlerts.value}건`,
      change: `${statsData.expiryAlerts.change}건`,
      isPositive: statsData.expiryAlerts.isPositive,
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: '승인 대기',
      value: `${statsData.pendingApprovals.value}건`,
      change: `${statsData.pendingApprovals.change}건`,
      isPositive: statsData.pendingApprovals.isPositive,
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className='rounded-xl bg-white p-6 shadow-sm'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='mb-2 text-sm text-gray-600'>{stat.title}</p>
                <h3 className='mb-2 text-3xl font-bold text-gray-900'>
                  {stat.value}
                </h3>
                {/* <div className='flex items-center text-sm'>
                  {stat.isPositive ? (
                    <TrendingUp size={16} className='mr-1 text-green-600' />
                  ) : (
                    <TrendingDown size={16} className='mr-1 text-red-600' />
                  )}
                  <span
                    className={
                      stat.isPositive ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {stat.change}
                  </span>
                </div> */}
              </div>
              <div
                className={`${stat.bgColor} flex items-center justify-center rounded-xl p-3`}
              >
                <Icon size={24} className={stat.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManufacturingManagement;
