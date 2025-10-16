import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  LogOut,
  Settings,
  Factory,
  BarChart3,
  Tags,
  ShoppingCart,
  Truck,
} from 'lucide-react';

const TopNavigation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const tabs = [
    {
      id: 'basicInfo',
      label: '기초정보',
      icon: <Settings className='h-4 w-4' />,
      page: 'basic',
    },
    {
      id: 'manufacturing',
      label: '제조',
      icon: <Factory className='h-4 w-4' />,
      page: 'manufacturing/nav1',
    },
    {
      id: 'quality',
      label: '품질',
      icon: <BarChart3 className='h-4 w-4' />,
      page: 'manufacturing/nav1',
    },
    {
      id: 'label',
      label: '라벨',
      icon: <Tags className='h-4 w-4' />,
      page: 'label',
    },
    {
      id: 'order',
      label: '주문',
      icon: <ShoppingCart className='h-4 w-4' />,
      page: 'receiving',
    },
    {
      id: 'shipping',
      label: '출고',
      icon: <Truck className='h-4 w-4' />,
      page: 'shipping/nav1',
    },
  ];

  // 로그인 상태 확인 (localStorage 사용)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name || userData.userId);
    }
  }, []);

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

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setShowUserMenu(false);
    navigate('/login');
  };

  const [activeTab, setActiveTab] = useState('basicInfo');

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
        <div className='flex items-center space-x-2'>
          {/* 알림 아이콘 */}
          <button className='relative rounded-full p-1.5 transition-colors hover:bg-gray-100'>
            <Bell size={16} className='text-gray-600' />
            <span className='absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-red-500'></span>
          </button>

          {/* 사용자 메뉴 */}
          <div className='relative' ref={userMenuRef}>
            <button
              onClick={handleUserIconClick}
              className='rounded-full p-1.5 transition-colors hover:bg-gray-100'
            >
              <User size={14} className='text-gray-600' />
              {isLoggedIn && (
                <span className='text-xs text-white'>{userName}</span>
              )}
            </button>

            {/* 드롭다운 메뉴 */}
            {isLoggedIn && showUserMenu && (
              <div className='absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg'>
                {/* 사용자 정보 */}
                <div className='border-b border-gray-200 px-4 py-3'>
                  <p className='text-sm font-semibold text-[#674529]'>
                    {userName}
                  </p>
                  <p className='text-xs text-gray-500'>애니콩 펫베이커리</p>
                </div>

                {/* 로그아웃 */}
                <div className='border-t border-gray-200 py-1'>
                  <button
                    onClick={handleLogout}
                    className='flex w-full items-center space-x-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50'
                  >
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
