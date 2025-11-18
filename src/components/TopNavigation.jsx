import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  User,
  Settings,
  Factory,
  BarChart3,
  Tags,
  Truck,
  Home,
  Package,
  FileText,
  Users,
} from 'lucide-react';

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const tabs = [
    {
      id: 'dash',
      label: '대시보드',
      icon: <Home className='h-4 w-4' />,
      page: 'dash',
    },
    {
      id: 'basicInfo',
      label: '기초정보',
      icon: <Settings className='h-4 w-4' />,
      page: 'basic',
    },
    {
      id: 'quality',
      label: '재고',
      icon: <BarChart3 className='h-4 w-4' />,
      page: 'inventory',
    },
    {
      id: 'receiving',
      label: '입출고',
      icon: <Package className='h-4 w-4' />,
      page: 'receiving/nav1',
    },
    {
      id: 'manufacturing',
      label: '제조',
      icon: <Factory className='h-4 w-4' />,
      page: 'manufacturing/nav1',
    },
    {
      id: 'shipping',
      label: '배송',
      icon: <Truck className='h-4 w-4' />,
      page: 'shipping',
    },   
    {
      id: 'approval',
      label: '결재',
      icon: <FileText className='h-4 w-4' />,
      page: 'approval/nav1',
    },   
    {
      id: 'label',
      label: '라벨',
      icon: <Tags className='h-4 w-4' />,
      page: 'label',
    },
    {
      id: 'user',
      label: '사용자',
      icon: <Users className='h-4 w-4' />,
      page: 'user/nav1',
    },  
  ];

  // Redux에서 사용자 정보 가져오기
  const { user: authUser } = useSelector((state) => state.auth);
  
  // 로그인 상태 확인 (Redux 사용)
  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
      setUserName(authUser.name || authUser.id);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [authUser]);
  
  // 로컬 localStorage 사용
  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     setIsLoggedIn(true);
  //     setUserName(userData.name || userData.userId);
  //   }
  // }, []);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMyPage = () => {
    // if (isLoggedIn) {
    //   navigate('/mypage');
    // } else {
    //   navigate('/login');
    // }
    navigate('/mypage');
  };

  const [activeTab, setActiveTab] = useState('dash');

  // URL 변경에 따라 activeTab 업데이트 (Sidebar 네비게이션과 동기화)
  useEffect(() => {
    const path = location.pathname;

    // URL 경로에서 activeTab ID를 추출
    if (path.startsWith('/dash')) {
      setActiveTab('dash');
    } else if (path.startsWith('/basic')) {
      setActiveTab('basicInfo');
    } else if (path.startsWith('/inventory')) {
      setActiveTab('quality');
    } else if (path.startsWith('/receiving')) {
      setActiveTab('receiving');
    } else if (path.startsWith('/manufacturing')) {
      setActiveTab('manufacturing');
    } else if (path.startsWith('/shipping')) {
      setActiveTab('shipping');
    } else if (path.startsWith('/approval')) {
      setActiveTab('approval');
    } else if (path.startsWith('/label')) {
      setActiveTab('label');
    } else if (path.startsWith('/user')) {
      setActiveTab('user');
    }
  }, [location.pathname]);

  const handleTabClick = (tabId, page) => {
    setActiveTab(tabId);
    navigate(`/${page}`);
  };

  return (
    <div className='border-b bg-white'>
      {/* 단일 라인 네비게이션 */}
      <div className='flex items-center justify-between px-4 py-2'>
        {/* 좌측: 탭 네비게이션 */}
        <div className='flex items-center space-x-1'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.page)}
              className={`flex items-center space-x-2 rounded px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#674529] text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 우측: 알림 및 사용자 아이콘 */}
        <div className='flex items-center space-x-2 min-w-[80px]'>
          {/* 사용자 메뉴 */}
          <div className='relative' ref={userMenuRef}>
            <button
              onClick={handleMyPage}
              className='rounded-lg p-1.5 transition-colors hover:bg-gray-100'
            >
              <User size={14} className='flex mx-auto text-gray-600' />
              {isLoggedIn && (
                <span className='text-xs text-gray-900 text-center'>{userName}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;