import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  UserCircle
} from "lucide-react";

const TopNavigation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // 로그인 상태 확인 (localStorage 사용)
  useEffect(() => {
    const user = localStorage.getItem("user");
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-end px-4 py-2">
        {/* 우측 아이콘들 */}
        <div className="flex items-center space-x-2">
          {/* 알림 아이콘 */}
          <button className="p-1.5 hover:bg-gray-100 rounded-full relative transition-colors">
            <Bell size={16} className="text-gray-600" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          {/* 사용자 메뉴 */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={handleUserIconClick}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={16} className="text-gray-600" />
            </button>

            {/* 드롭다운 메뉴 */}
            {isLoggedIn && showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* 사용자 정보 */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-[#674529]">{userName}</p>
                  <p className="text-xs text-gray-500">애니콩 펫베이커리</p>
                </div>

                {/* 로그아웃 */}
                <div className="border-t border-gray-200 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
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
