import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  Factory,
  Settings,
  Users,
  Tags,
  BarChart3,
  Home,
  FileText,
  FolderOpen,
} from 'lucide-react';

const Sidebar = ({ activeNav, setActiveNav }) => {
  const [openSections, setOpenSections] = useState({
    제조관리: false,
    배송관리: false,
    생산관리: false,
    전자결재: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className='flex h-screen w-64 flex-col bg-white shadow-lg'>
      {/* 로고/헤더 영역 */}
      <div className='flex-shrink-0 border-b px-4 py-2'>
        <div className='flex items-center space-x-1.5'>
          <div className='h-6 w-6 rounded bg-orange-500'></div>
          <div>
            <div className='text-sm font-bold'>애니콩</div>
            <div className='text-[10px] text-gray-500'>펫 베이커리</div>
          </div>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className='flex-1 overflow-y-auto p-3'>
        {/* 대시보드 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('대시보드')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '대시보드'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home size={16} />
            <span>대시보드</span>
          </button>
        </div>

        {/* 기초정보 섹션 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('기초정보')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '기초정보'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings size={16} />
            <span>기초정보</span>
          </button>
        </div>

        {/* 입고관리 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('입고관리')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '입고관리'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package size={16} />
            <span>입고관리</span>
          </button>
        </div>

        {/* 제조관리 */}
        <div className='mb-2'>
          <button
            onClick={() => toggleSection('제조관리')}
            className='flex w-full items-center justify-between rounded p-1.5 text-left text-sm text-gray-700 hover:bg-gray-100'
          >
            <div className='flex items-center space-x-1.5'>
              <Factory size={16} />
              <span>제조관리</span>
            </div>
            {openSections.제조관리 ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          {openSections.제조관리 && (
            <div className='ml-5 mt-1 space-y-0.5'>
              <button
                onClick={() => setActiveNav('제조관리-nav1')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '제조관리-nav1'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                1공장 전처리
              </button>
              <button
                onClick={() => setActiveNav('제조관리-nav2')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '제조관리-nav2'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                공장간 이동
              </button>
              <button
                onClick={() => setActiveNav('제조관리-nav3')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '제조관리-nav3'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                2공장 제조
              </button>
            </div>
          )}
        </div>

        {/* 재고관리 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('재고관리')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '재고관리'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={16} />
            <span>재고관리</span>
          </button>
        </div>

        {/* 배송관리 */}
        <div className='mb-2'>
          <button
            onClick={() => toggleSection('배송관리')}
            className='flex w-full items-center justify-between rounded p-1.5 text-left text-sm text-gray-700 hover:bg-gray-100'
          >
            <div className='flex items-center space-x-1.5'>
              <Truck size={16} />
              <span>배송관리</span>
            </div>
            {openSections.배송관리 ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          {openSections.배송관리 && (
            <div className='ml-5 mt-1 space-y-0.5'>
              <button
                onClick={() => setActiveNav('배송관리-nav1')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '배송관리-nav1'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                B2B 출고
              </button>
              <button
                onClick={() => setActiveNav('배송관리-nav2')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '배송관리-nav2'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                B2C 출고
              </button>
              <button
                onClick={() => setActiveNav('배송관리-nav3')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '배송관리-nav3'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                출고 간편등록
              </button>
            </div>
          )}
        </div>

        {/* 생산관리 */}
        <div className='mb-2'>
          <button
            onClick={() => toggleSection('생산관리')}
            className='flex w-full items-center justify-between rounded p-1.5 text-left text-sm text-gray-700 hover:bg-gray-100'
          >
            <div className='flex items-center space-x-1.5'>
              <FolderOpen size={16} />
              <span>생산관리</span>
            </div>
            {openSections.생산관리 ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          {openSections.생산관리 && (
            <div className='ml-5 mt-1 space-y-0.5'>
              <button
                onClick={() => setActiveNav('생산관리-nav1')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '생산관리-nav1'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                생산지시서 관리
              </button>
              <button
                onClick={() => setActiveNav('생산관리-nav2')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '생산관리-nav2'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                제조이력 캘린더
              </button>
            </div>
          )}
        </div>

        {/* 전자결재 */}
        <div className='mb-2'>
          <button
            onClick={() => toggleSection('전자결재')}
            className='flex w-full items-center justify-between rounded p-1.5 text-left text-sm text-gray-700 hover:bg-gray-100'
          >
            <div className='flex items-center space-x-1.5'>
              <FileText size={16} />
              <span>전자결재</span>
            </div>
            {openSections.전자결재 ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          {openSections.전자결재 && (
            <div className='ml-5 mt-1 space-y-0.5'>
              <button
                onClick={() => setActiveNav('전자결재-nav1')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '전자결재-nav1'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                결재시스템
              </button>
              <button
                onClick={() => setActiveNav('전자결재-nav2')}
                className={`block w-full rounded p-1.5 text-left text-xs ${
                  activeNav === '전자결재-nav2'
                    ? 'bg-[#674529] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                문서보관함
              </button>
            </div>
          )}
        </div>

        {/* 라벨관리 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('라벨관리')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '라벨관리'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Tags size={16} />
            <span>라벨관리</span>
          </button>
        </div>

        {/* 사용자 관리 */}
        <div className='mb-2'>
          <button
            onClick={() => setActiveNav('사용자관리')}
            className={`flex w-full items-center space-x-1.5 rounded p-1.5 text-left text-sm ${
              activeNav === '사용자관리'
                ? 'bg-[#674529] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users size={16} />
            <span>사용자 관리</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
