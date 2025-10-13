import { TrendingUp, TrendingDown, Truck, Factory, Package, AlertTriangle } from 'lucide-react';

const ManufacturingManagement = () => {
  const stats = [
    {
      title: '오늘 입고',
      value: '24건',
      change: '+12%',
      isPositive: true,
      icon: Truck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: '제조 진행',
      value: '15건',
      change: '+8%',
      isPositive: true,
      icon: Factory,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: '출고 완료',
      value: '18건',
      change: '+5%',
      isPositive: true,
      icon: Package,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: '재고 알람',
      value: '3건',
      change: '-2건',
      isPositive: false,
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <div className="flex items-center text-sm">
                  {stat.isPositive ? (
                    <TrendingUp size={16} className="text-green-600 mr-1" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      stat.isPositive ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`${stat.bgColor} p-3 rounded-xl flex items-center justify-center`}
              >
                <Icon size={24} className={stat.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManufacturingManagement;
