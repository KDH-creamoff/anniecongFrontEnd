import { Package, MapPin, Clock, Search } from 'lucide-react';

const InventoryStatusList = ({ filters }) => {
  // 임시 데이터 (이미지 기준)
  const mockData = [
    {
      id: 1,
      code: 'RAW001',
      name: '닭고기 (가슴살)',
      category: '원재료',
      warehouse: 'P1-RM',
      warehouseCode: '(A1-01)',
      quantity: '250 kg',
      lotNumber: 'LOT20250909001',
      expiryDate: '2025-09-16',
      daysLeft: '-27일',
      status: '정상'
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
      expiryDate: '2025-09-13',
      daysLeft: '-30일',
      status: '유통기한임박'
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
      expiryDate: '2025-10-08',
      daysLeft: '-5일',
      status: '정상'
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
      expiryDate: '2025-09-21',
      daysLeft: '-22일',
      status: '부족'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-[#674529]" />
          <h3 className="text-base font-semibold text-[#674529]">재고 현황 (4건)</h3>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F9F6F2] border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">품목코드</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">품목명</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">카테고리</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">재고량</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">창고/위치</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">로트번호</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">유통기한</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">상태</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#674529]">이력</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{item.category}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.quantity}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{item.warehouse} {item.warehouseCode}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{item.lotNumber}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{item.expiryDate} {item.daysLeft}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${
                    item.status === '정상' ? 'bg-green-100 text-green-700' :
                    item.status === '부족' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="text-gray-500 hover:text-[#674529] transition-colors">
                    <Search className="w-5 h-5" />
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
