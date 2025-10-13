import { Package, ArrowRightLeft, BarChart3, Factory, Settings, Tags, Truck, Users } from 'lucide-react';

const MainModule = ({ onNavigate }) => {
    const moduleButtons = [
    {
      id: 'basicInfo',
      title: '기초정보 설정',
      description: '품목등록, 공장정보, 바코드 템플릿',
      icon: <Settings className="w-6 h-6" />,
      nav: '기초정보',
      color: 'bg-[#724323]'
    },
    {
      id: 'receiving',
      title: '입고/검수',
      description: '구매입고 스캔, 원재료 라벨프린트',
      icon: <Truck className="w-6 h-6" />,
      nav: '입고관리',
      color: 'bg-[#A3C478]',
      count: 12
    },
    {
      id: 'plant1',
      title: '1공장 전처리',
      description: '공정시작 스캔, 전처리 산출',
      icon: <Factory className="w-6 h-6" />,
      nav: '제조관리-nav1',
      color: 'bg-[#F9B679]',
      count: 8
    },
    {
      id: 'transfer',
      title: '공장간 이동',
      description: '1공장 출고 → 2공장 입고',
      icon: <ArrowRightLeft className="w-6 h-6" />,
      nav: '제조관리-nav2',
      color: 'bg-[#724323]',
      count: 3
    },
    {
      id: 'plant2',
      title: '2공장 베이킹/포장',
      description: 'MO발행, 베이킹 공정, 포장',
      icon: <Factory className="w-6 h-6" />,
      nav: '제조관리-nav3',
      color: 'bg-[#A3C478]',
      count: 15
    },
    {
      id: 'shipping',
      title: '출고관리',
      description: 'B2B/B2C 피킹, FEFO 우선',
      icon: <Truck className="w-6 h-6" />,
      nav: '출고관리-nav1',
      color: 'bg-[#F9B679]',
      count: 6
    },
    {
      id: 'label',
      title: '라벨 프린트',
      description: 'ZPL 템플릿, 브라우저 출력',
      icon: <Tags className="w-6 h-6" />,
      nav: '라벨관리',
      color: 'bg-[#724323]'
    },
    {
      id: 'inventory',
      title: '재고/이력 조회',
      description: '로트별 추적, 유통기한 관리',
      icon: <BarChart3 className="w-6 h-6" />,
      nav: '재고관리',
      color: 'bg-[#A3C478]'
    },
    {
      id: 'users',
      title: '사용자/권한',
      description: 'RBAC 기반 접근제어',
      icon: <Users className="w-6 h-6" />,
      nav: '사용자관리',
      color: 'bg-[#F9B679]'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Package className="w-5 h-5 text-[#674529]" />
        <p className="text-lg text-[#674529]">주요 모듈</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moduleButtons.map((module) => (
              <button
                key={module.id}
                className="h-auto p-6 hover:bg-[#F5E9D5] border border-[#F5E9D5] rounded-xl"
                onClick={() => onNavigate(module.nav)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-4 ${module.color} rounded-xl text-white relative`}>
                    {module.icon}
                    {module.count && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {module.count}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-[#724323] mb-1">{module.title}</h3>
                    <p className="text-sm text-[#333333]">{module.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
    </div>
  );
};

export default MainModule;
