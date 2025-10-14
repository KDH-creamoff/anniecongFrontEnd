import { useNavigate } from 'react-router-dom';
import ManufacturingManagement from '../components/dashboard/ManufacturingManagement';
import MainModule from '../components/dashboard/MainModule';
import UrgentMatters from '../components/dashboard/UrgentMatters';
import ProductionStatus from '../components/dashboard/ProductionStatus';

const Dash = () => {
  const navigate = useNavigate();

  const handleNavigate = (nav) => {
    const navMap = {
      대시보드: '/dash',
      기초정보: '/basic',
      입고관리: '/receiving',
      '제조관리-nav1': '/manufacturing/nav1',
      '제조관리-nav2': '/manufacturing/nav2',
      '제조관리-nav3': '/manufacturing/nav3',
      재고관리: '/inventory',
      '배송관리-nav1': '/shipping/nav1',
      '배송관리-nav2': '/shipping/nav2',
      라벨관리: '/label',
      사용자관리: '/user-management',
    };

    navigate(navMap[nav] || '/dash');
  };
  return (
    <div>
      {/* 페이지 헤더 */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold' style={{ color: '#674529' }}>
          애니콩 펫베이커리 제조관리 시스템
        </h1>
        <p className='mt-1 text-sm text-gray-600'>
          2025년 9월 11일 목요일 · 듀얼 플랜트 운영 중
        </p>
      </div>

      {/* 제조 관리 통계 */}
      <div className='mb-8'>
        <ManufacturingManagement />
      </div>

      {/* 나머지 대시보드 컴포넌트들 */}
      <div className='mb-6'>
        <MainModule onNavigate={handleNavigate} />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <UrgentMatters />
        <ProductionStatus />
      </div>
    </div>
  );
};

export default Dash;
