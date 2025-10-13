import {
    Home as HomeIcon,
    Settings,
    Package,
    ClipboardList,
    BarChart3,
    PackageOpen,
    Factory,
    FileCheck,
    Tag,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const Home = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 왼쪽 사이드바 */}
            <div className="w-64 bg-white shadow-lg">
                {/* 로고/헤더 영역 */}
                <div className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded"></div>
                        <div>
                            <div className="font-bold">애니콩</div>
                            <div className="text-xs text-gray-500">곧 베이커리</div>
                        </div>
                    </div>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="p-4">
                    <div className="mb-6">
                        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded">
                            <HomeIcon size={20} />
                            <span>대시보드</span>
                        </a>
                    </div>

                    {/* 기초정보 섹션 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <Settings size={20} />
                                <span>기초정보</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                        <div className="ml-6 mt-2 space-y-1">
                            <a href="#" className="block bg-orange-700 text-white p-2 rounded">nav1</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav2</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav3</a>
                        </div>
                    </div>

                    {/* 입고관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <Package size={20} />
                                <span>입고관리</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* 제조관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <ClipboardList size={20} />
                                <span>제조관리</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                        <div className="ml-6 mt-2 space-y-1">
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav1</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav2</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav3</a>
                        </div>
                    </div>

                    {/* 재고관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <BarChart3 size={20} />
                                <span>재고관리</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                        <div className="ml-6 mt-2 space-y-1">
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav1</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav2</a>
                        </div>
                    </div>

                    {/* 출고관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <PackageOpen size={20} />
                                <span>출고관리</span>
                            </div>
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* 생산관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <Factory size={20} />
                                <span>생산관리</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                        <div className="ml-6 mt-2 space-y-1">
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav1</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav2</a>
                        </div>
                    </div>

                    {/* 전자결재 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <FileCheck size={20} />
                                <span>전자결재</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                        <div className="ml-6 mt-2 space-y-1">
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav1</a>
                            <a href="#" className="block text-gray-700 hover:bg-gray-100 p-2 rounded">nav2</a>
                        </div>
                    </div>

                    {/* 라벨관리 */}
                    <div className="mb-4">
                        <button className="flex items-center justify-between w-full text-left text-gray-700 p-2 hover:bg-gray-100 rounded">
                            <div className="flex items-center space-x-2">
                                <Tag size={20} />
                                <span>라벨관리</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="flex-1 overflow-auto">
                {/* 상단 탭 네비게이션 */}
                <div className="bg-white border-b">
                    <div className="flex space-x-4 px-6 py-3">
                        <button className="px-4 py-2 bg-gray-100 rounded">기초정보</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">제조</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">품질</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">판매</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">주문</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">출고</button>
                    </div>
                </div>

                {/* 메인 콘텐츠 */}
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
                </div>
            </div>
        </div>
    );
}


export default Home;