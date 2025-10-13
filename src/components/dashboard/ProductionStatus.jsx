import { BarChart3 } from 'lucide-react';

const ProductionStatus = () => {
  const productionData = [
    {
      id: 1,
      name: '1공장 전처리',
      percentage: 75,
      color: 'bg-[#A3C478]'
    },
    {
      id: 2,
      name: '2공장 제조',
      percentage: 80,
      color: 'bg-[#F9B679]'
    },
    {
      id: 3,
      name: '포장/출고',
      percentage: 60,
      color: 'bg-[#724323]'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-5 h-5 text-[#674529]" />
        <h3 className="text-lg text-[#674529]">생산 현황 (오늘)</h3>
      </div>

      <div className="space-y-6">
        {productionData.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#674529] font-medium">{item.name}</span>
              <span className="text-[#674529] font-semibold">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionStatus;
