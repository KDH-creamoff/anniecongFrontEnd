import { Package, MapPin, Clock, Search } from 'lucide-react';

const InventoryStatusList = () => {
  // 유통기한 계산 함수
  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 상태 결정 함수
  const getStatus = (daysLeft) => {
    if (daysLeft < 0) return '유통기한만료';
    if (daysLeft <= 3) return '유통기한임박';
    if (daysLeft <= 7) return '주의';
    return '정상';
  };

  // 임시 데이터 (이미지 기준)
  const rawData = [
    {
      id: 1,
      code: 'RAW001',
      name: '닭고기 (가슴살)',
      category: '원재료',
      warehouse: 'P1-RM',
      warehouseCode: '(A1-01)',
      quantity: '250 kg',
      lotNumber: 'LOT20250909001',
      expiryDate: '2025-10-20',
    },
    {
      id: 2,
      code: 'WIP001',
      name: '전처리 믹스 A',
      category: 'WIP',
      warehouse: 'P2-WIP',
      warehouseCode: '(B2-05)',
      quantity: '150 kg',
      lotNumber: 'LOT20250910002',
      expiryDate: '2025-10-16',
    },
    {
      id: 3,
      code: 'FG001',
      name: '애니콩 펫베이커리 A',
      category: '완제품',
      warehouse: 'P2-FG',
      warehouseCode: '(C3-12)',
      quantity: '850 ea',
      lotNumber: 'LOT20250908003',
      expiryDate: '2025-10-25',
    },
    {
      id: 4,
      code: 'RAW002',
      name: '당근',
      category: '원재료',
      warehouse: 'P1-RM',
      warehouseCode: '(A2-08)',
      quantity: '50 kg',
      lotNumber: 'LOT20250907004',
      expiryDate: '2025-10-18',
    },
    {
      id: 5,
      code: 'RAW003',
      name: '고구마',
      category: '원재료',
      warehouse: 'P1-RM',
      warehouseCode: '(A1-03)',
      quantity: '180 kg',
      lotNumber: 'LOT20250908005',
      expiryDate: '2025-10-22',
    },
    {
      id: 6,
      code: 'WIP002',
      name: '전처리 믹스 B',
      category: 'WIP',
      warehouse: 'P2-WIP',
      warehouseCode: '(B2-06)',
      quantity: '200 kg',
      lotNumber: 'LOT20250909006',
      expiryDate: '2025-10-15',
    },
    {
      id: 7,
      code: 'FG002',
      name: '애니콩 펫베이커리 B',
      category: '완제품',
      warehouse: 'P2-FG',
      warehouseCode: '(C3-13)',
      quantity: '650 ea',
      lotNumber: 'LOT20250910007',
      expiryDate: '2025-10-30',
    },
    {
      id: 8,
      code: 'RAW004',
      name: '쌀가루',
      category: '원재료',
      warehouse: 'P1-RM',
      warehouseCode: '(A2-09)',
      quantity: '30 kg',
      lotNumber: 'LOT20250906008',
      expiryDate: '2025-10-17',
    },
    {
      id: 9,
      code: 'FG003',
      name: '펫 트릿 스낵 세트',
      category: '완제품',
      warehouse: 'P2-FG',
      warehouseCode: '(C3-14)',
      quantity: '420 ea',
      lotNumber: 'LOT20250911008',
      expiryDate: '2025-11-05',
    },
  ];

  // 유통기한 계산하여 최종 데이터 생성
  const mockData = rawData.map((item) => {
    const daysLeft = calculateDaysLeft(item.expiryDate);
    const status = getStatus(daysLeft);
    return {
      ...item,
      daysLeft: daysLeft >= 0 ? `- ${daysLeft}일` : `+ ${daysLeft}일`,
      status: item.quantity.includes('30 kg') ? '부족' : status,
    };
  });

  return (
    <div className='overflow-hidden rounded-xl bg-white shadow-sm'>
      {/* 헤더 */}
      <div className='border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center space-x-2'>
          <Package className='h-5 w-5 text-[#674529]' />
          <h3 className='text-base text-[#674529]'>
            재고 현황 ({mockData.length}건)
          </h3>
        </div>
      </div>

      {/* 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                품목코드
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                품목명
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                카테고리
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                재고량
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                창고/위치
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                바코드번호
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>
                유통기한
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium'>상태</th>
              <th className='px-4 py-3 text-left text-sm font-medium'>이력</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {mockData.map((item) => (
              <tr
                key={item.id}
                className='transition-colors hover:bg-gray-50/50'
              >
                <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                  {item.code}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>{item.name}</td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.category}
                </td>
                <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                  {item.quantity}
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center space-x-1 text-sm text-gray-700'>
                    <MapPin className='h-4 w-4 text-[#674529]' />
                    <span>
                      {item.warehouse} {item.warehouseCode}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {item.lotNumber}
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center space-x-1 text-sm text-gray-700'>
                    <Clock className='h-4 w-4 text-gray-500' />
                    <span>
                      {item.expiryDate} {item.daysLeft}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex rounded px-3 py-1 text-xs font-medium ${
                      item.status === '정상'
                        ? 'bg-green-100 text-green-700'
                        : item.status === '부족'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                    <Search className='h-5 w-5 text-[#674529]' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryStatusList;
