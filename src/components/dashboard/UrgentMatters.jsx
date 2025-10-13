import { AlertTriangle, Package, Tag, CheckCircle } from 'lucide-react';

const UrgentMatters = () => {
  const urgentItems = [
    {
      id: 1,
      icon: <AlertTriangle className="w-5 h-5" />,
      iconColor: 'text-red-500',
      title: '유통기한 임박 품목',
      subtitle: '8건 대기',
      badge: '처리'
    },
    {
      id: 2,
      icon: <Package className="w-5 h-5" />,
      iconColor: 'text-orange-500',
      title: '재고 부족 원재료',
      subtitle: '3건 대기',
      badge: '처리'
    },
    {
      id: 3,
      icon: <Tag className="w-5 h-5" />,
      iconColor: 'text-orange-400',
      title: '승인 대기 라벨',
      subtitle: '2건 대기',
      badge: '처리'
    },
    {
      id: 4,
      icon: <CheckCircle className="w-5 h-5" />,
      iconColor: 'text-green-600',
      title: '품질검사 완료',
      subtitle: '12건 대기',
      badge: '처리'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-[#674529]" />
        <h3 className="text-lg text-[#674529]">긴급 처리 사항</h3>
      </div>

      <div className="space-y-3">
        {urgentItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#F5E9D5] rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className={item.iconColor}>
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-[#674529]">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-[#674529] px-3 py-1 hover:bg-white cursor-pointer rounded">
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentMatters;
