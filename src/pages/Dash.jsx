import { useNavigate } from 'react-router-dom';
import ManufacturingManagement from '../components/dashboard/ManufacturingManagement';
import MainModule from '../components/dashboard/MainModule';

const Dash = () => {
  const navigate = useNavigate();

  const handleNavigate = (nav) => {
    const navMap = {
      대시보드: '/dash',
      기초정보: '/basic',
      '기초정보-품목등록': '/basic',
      '기초정보-공정정보': '/basic',
      '기초정보-BOM관리': '/basic',
      입출고관리: '/receiving',
      '입출고관리-nav1': '/receiving/nav1',
      '입출고관리-nav2': '/receiving/nav2',
      '제조관리-nav1': '/manufacturing/nav1',
      '제조관리-nav2': '/manufacturing/nav2',
      '제조관리-nav3': '/manufacturing/nav3',
      '제조관리-nav4': '/manufacturing/nav4',
      재고관리: '/inventory',
      배송관리: '/shipping',
      '전자결재-nav1': '/approval/nav1',
      '전자결재-nav2': '/approval/nav2',
      라벨관리: '/label',
      '사용자관리-nav1': '/user/nav1',
      '사용자관리-nav2': '/user/nav2',
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
    </div>
  );
};

export default Dash;