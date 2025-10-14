import { TrendingUp, AlertTriangle, Package, TrendingDown } from 'lucide-react';

const InventoryAlertsSummary = () => {
  const alerts = [
    {
      icon: AlertTriangle,
      title: '유통기한 임박',
      titleColor: 'text-[#9f0712]',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      items: [
        {
          label: '1개 품목이 3일 내 유통기한 만료',
          textColor: 'text-red-600',
        },
      ],
    },
    {
      icon: Package,
      title: '재고 부족',
      titleColor: 'text-[#8f530b]',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      items: [
        {
          label: '1개 품목이 안전재고 미만',
          textColor: 'text-yellow-600',
        },
      ],
    },
    {
      icon: TrendingUp,
      title: '재고 회전',
      titleColor: 'text-[#016630]',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      items: [
        {
          label: '평균 재고회전일: 15일',
          textColor: 'text-green-600',
        },
      ],
    },
  ];

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <AlertTriangle className='h-5 w-5 text-[#674529]' />
        <h2 className='text-lg text-[#674529]'>주의사항 요약</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {alerts.map((alert, index) => (
          <div key={index} className={`${alert.bgColor} rounded-lg p-5`}>
            <div className='mb-3 flex items-center gap-2'>
              <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
              <h3 className={`font-semibold ${alert.titleColor}`}>
                {alert.title}
              </h3>
            </div>
            {alert.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <p className={`text-sm font-medium ${item.textColor}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryAlertsSummary;
