import { Package, AlertTriangle, Clock, MapPin } from 'lucide-react';

const InventoryStatusSummary = ({ data }) => {
  const summaryCards = [
    {
      id: 1,
      title: '총 품목수',
      value: data?.totalItems || 4,
      icon: <Package className="w-6 h-6" />,
      bgColor: 'bg-[#724323]',
      iconBgColor: 'bg-[#5a3419]'
    },
    {
      id: 2,
      title: '부족 재고',
      value: data?.lowStock || 1,
      icon: <AlertTriangle className="w-6 h-6" />,
      bgColor: 'bg-[#F9B679]',
      iconBgColor: 'bg-[#f5a961]'
    },
    {
      id: 3,
      title: '유통기한 임박',
      value: data?.expiringSoon || 1,
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-[#F9B679]',
      iconBgColor: 'bg-[#f5a961]'
    },
    {
      id: 4,
      title: '창고 수',
      value: data?.warehouseCount || 3,
      icon: <MapPin className="w-6 h-6" />,
      bgColor: 'bg-[#A3C478]',
      iconBgColor: 'bg-[#8fb566]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-[#674529]">{card.value}</p>
            </div>
            <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center`}>
              <div className="text-white">
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStatusSummary;
