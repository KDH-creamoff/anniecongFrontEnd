import {
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
} from '../../store/modules/dash/selectors';

const ManufacturingManagement = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 통계 데이터 가져오기
  const statsData = useSelector(selectManufacturingStatsData);

  // 컴포넌트 마운트 시 통계 데이터 조회
  useEffect(() => {
    dispatch(getManufacturingStats.request());
  }, [dispatch]);

  // 디버깅: 실제 데이터 구조 확인
  useEffect(() => {
    console.log('=== ManufacturingManagement Debug ===');
    console.log('statsData:', statsData);
    console.log('statsData type:', typeof statsData);
    console.log('statsData keys:', statsData ? Object.keys(statsData) : 'null');
  }, [statsData]);

  // 통계 데이터가 없을 때
  if (!statsData) {
    return null;
  }

  const stats = [
    {
      title: '입고 완료',
      value: `${statsData['입고 완료']?.today ?? 0}건`,
      icon: Truck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: '제조 완료',
      value: `${statsData['제조 완료']?.today ?? 0}건`,
      icon: Factory,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: '출고 완료',
      value: `${statsData['출고 완료']?.today ?? 0}건`,
      icon: Package,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: '재고 알람',
      value: `${statsData['재고 알람']?.count ?? 0}건`,
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: '유통기한 임박',
      value: `${statsData['유통기한 임박']?.count ?? 0}건`,
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: '승인 대기',
      value: `${statsData['승인 대기']?.count ?? 0}건`,
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
