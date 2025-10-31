import { useState } from 'react';
import { Truck, Package, Box } from 'lucide-react';

const TransferStatus = () => {
  const [selectedTransport, setSelectedTransport] = useState('전체');
  const [transfers] = useState([
    {
      route: '1공장 → 2공장',
      status: '이동완료',
      departureDate: '2025-10-25',
      quantity: '100 Kg',
      item: '당근',
      transport: '트럭'
    },
    {
      route: '1창고 → 2창고',
      status: '이동중',
      departureDate: '2025-10-30',
      quantity: '50 Kg',
      item: '고구마',
      transport: '팔레트'
    },
    {
      route: '2공장 → 1창고',
      status: '이동대기',
      departureDate: '2025-10-31',
      quantity: '75 Kg',
      item: '닭고기 (가슴살)',
      transport: '박스'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case '이동완료':
        return 'bg-green-100 text-green-700';
      case '이동대기':
        return 'bg-blue-100 text-blue-700';
      case '이동중':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTransfers =
    selectedTransport === '전체'
      ? transfers
      : transfers.filter((t) => t.transport === selectedTransport);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#674529]">이송 현황</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">이송경로</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">상태</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">운송방식</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">출발일</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">품목</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">수량</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.map((transfer, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{transfer.route}</td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transfer.status
                    )}`}
                  >
                    {transfer.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {transfer.transport}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{transfer.departureDate}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{transfer.item}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{transfer.quantity}</td>
              </tr>
            ))}
            {filteredTransfers.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-sm text-gray-500">
                  등록된 이송 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferStatus;
