import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('대시보드');
  const [openSections, setOpenSections] = useState({
    입출고관리: false,
    제조관리: false,
    배송관리: false,
    전자결재: false,
    사용자관리: false,
  });

  // URL에 따라 activeNav 업데이트 및 해당 섹션 자동 펼치기
  useEffect(() => {
    const path = location.pathname;
    const pathMap = {
      '/dash': '대시보드',
      '/basic': '기초정보',
      '/receiving/nav1': '입출고관리-nav1',
      '/receiving/nav2': '입출고관리-nav2',
      '/manufacturing/nav1': '제조관리-nav1',
      '/manufacturing/nav2': '제조관리-nav2',
      '/manufacturing/nav3': '제조관리-nav3',
      '/manufacturing/nav4': '제조관리-nav4',
      '/manufacturing/nav5': '제조관리-nav5',
      '/inventory': '재고관리',
      '/shipping': '배송관리',
      '/approval/nav1': '전자결재-nav1',
      '/approval/nav2': '전자결재-nav2',
      '/label': '라벨관리',
      '/user/nav1': '사용자관리-nav1',
      '/user/nav2': '사용자관리-nav2',
    };

    const newActiveNav = pathMap[path] || '대시보드';
    setActiveNav(newActiveNav);

    // 자식 메뉴가 있는 섹션일 경우 자동으로 펼치기
    const newOpenSections = {
      기초정보: false,
      입출고관리: newActiveNav.startsWith('입출고관리'),
      제조관리: newActiveNav.startsWith('제조관리'),
      배송관리: false,
      전자결재: newActiveNav.startsWith('전자결재'),
      사용자관리: newActiveNav.startsWith('사용자관리'),
    };
    setOpenSections(newOpenSections);
  }, [location.pathname]);

  // activeNav 변경 시 URL 업데이트
  const handleNavChange = (nav) => {
    setActiveNav(nav);
    const navMap = {
      대시보드: '/dash',
      기초정보: '/basic',
      '입출고관리-nav1': '/receiving/nav1',
      '입출고관리-nav2': '/receiving/nav2',
      '제조관리-nav1': '/manufacturing/nav1',
      '제조관리-nav2': '/manufacturing/nav2',
      '제조관리-nav3': '/manufacturing/nav3',
      '제조관리-nav4': '/manufacturing/nav4',
      '제조관리-nav5': '/manufacturing/nav5',
      재고관리: '/inventory',
      배송관리: '/shipping',
      '전자결재-nav1': '/approval/nav1',
      '전자결재-nav2': '/approval/nav2',
      라벨관리: '/label',
      사용자관리: '/user',
      '사용자관리-nav1': '/user/nav1',
      '사용자관리-nav2': '/user/nav2',
    };

    navigate(navMap[nav] || '/dash');
  };

  return (
    <div className='flex h-screen' style={{ backgroundColor: '#f9f6f2' }}>
      {/* 왼쪽 사이드바 */}
      <Sidebar 
        activeNav={activeNav} 
        setActiveNav={handleNavChange}
        openSections={openSections}
        setOpenSections={setOpenSections}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex-1 overflow-auto'>
        {/* 상단 탭 네비게이션 */}
        <TopNavigation />

        {/* 메인 콘텐츠 */}
        <div className='p-8'>
          {/* 라우트된 페이지 렌더링 */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
