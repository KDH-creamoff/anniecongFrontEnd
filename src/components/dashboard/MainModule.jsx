import {
  Package,
  BarChart3,
  Factory,
  Settings,
  Tags,
  Truck,
  Users,
  FileText,
} from 'lucide-react';

const MainModule = ({ onNavigate }) => {
  const moduleButtons = [
    {
      id: 'basicInfo',
      title: '기초정보',
      description: '',
      icon: <Settings className='h-6 w-6' />,
      nav: '기초정보',
      color: 'bg-[#724323]',
    },
    {
      id: 'inventory',
      title: '재고관리',
      description: '',
      icon: <BarChart3 className='h-6 w-6' />,
      nav: '재고관리',
      color: 'bg-[#A3C478]',
      count: 12,
    },
    {
      id: 'receiving',
      title: '입출고관리',
      description: '입고 관리, 출고관리',
      icon: <Package className='h-6 w-6' />,
      nav: '입출고관리-nav1',
      color: 'bg-[#F9B679]',
      count: 8,
    },
    {
      id: 'manufacturing',
      title: '제조관리',
      description: '제조이력 캘린더, 1공장, 공장간 이동, 2공장, 작업지시서 관리',
      icon: <Factory className='h-6 w-6' />,
      nav: '제조관리-nav1',
      color: 'bg-[#724323]',
      count: 3,
    },
    {
      id: 'shipping',
      title: '배송관리',
      description: '',
      icon: <Truck className='h-6 w-6' />,
      nav: '배송관리',
      color: 'bg-[#A3C478]',
      count: 15,
    },
    {
      id: 'approval',
      title: '전자결재',
      description: '결재시스템, 문서보관함',
      icon: <FileText className='h-6 w-6' />,
      nav: '전자결재-nav1',
      color: 'bg-[#F9B679]',
      count: 6,
    },
    {
      id: 'label',
      title: '라벨관리',
      description: '',
      icon: <Tags className='h-6 w-6' />,
      nav: '라벨관리',
      color: 'bg-[#724323]',
    },
    {
      id: 'users',
      title: '사용자관리',
      description: '직원 관리, 권한 관리',
      icon: <Users className='h-6 w-6' />,
      nav: '사용자관리-nav1',
      color: 'bg-[#A3C478]',
    },
  ];

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center space-x-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <p className='text-lg text-[#674529]'>주요 모듈</p>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {moduleButtons.map((module) => (
          <button
            key={module.id}
            className='h-auto rounded-xl border border-[#F5E9D5] p-6 hover:bg-[#F5E9D5]'
            onClick={() => onNavigate(module.nav)}
          >
            <div className='flex flex-col items-center space-y-3'>
              <div
                className={`p-4 ${module.color} relative rounded-xl text-white`}
              >
                {module.icon}
                {/* {module.count && (
                  <div className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                    {module.count}
                  </div>
                )} */}
              </div>
              <div className='text-center'>
                <h3 className='mb-1 font-medium text-[#724323]'>
                  {module.title}
                </h3>
                <p className='text-sm text-[#333333]'>{module.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainModule;