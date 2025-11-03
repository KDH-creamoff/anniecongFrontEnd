import { Package, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const ShippingList = () => {
  // 샘플 데이터
  const [shippingData] = useState([
    {
      id: 1,
      itemName: '애니콩 프리미엄 오가닉 쿠키 초코칩 500g 대용량 패밀리팩',
      recipientName: '김민수',
      recipientPhone: '010-1234-5678',
      recipientZipCode: '06234',
      recipientAddress: '서울특별시 강남구 테헤란로 123',
      recipientAddressDetail: '456호',
      deliveryMessage: '문 앞에 놓아주세요. 부재시 경비실에 맡겨주시면 감사하겠습니다.'
    },
    {
      id: 2,
      itemName: '애니콩 바닐라 쿠키',
      recipientName: '이영희',
      recipientPhone: '010-2345-6789',
      recipientZipCode: '13579',
      recipientAddress: '경기도 성남시 분당구 판교역로 235',
      recipientAddressDetail: '1층',
      deliveryMessage: '배송 전 연락 부탁드립니다'
    },
    {
      id: 3,
      itemName: '애니콩 딸기 케이크 프리미엄 에디션 2kg 선물용 특별 포장',
      recipientName: '박철수',
      recipientPhone: '010-3456-7890',
      recipientZipCode: '12345',
      recipientAddress: '서울특별시 송파구 올림픽로 300 롯데월드타워',
      recipientAddressDetail: '88층 스카이라운지',
      deliveryMessage: ''
    },
    {
      id: 4,
      itemName: '애니콩 초코 브라우니',
      recipientName: '최지민',
      recipientPhone: '010-4567-8901',
      recipientZipCode: '54321',
      recipientAddress: '부산광역시 해운대구 해운대해변로 264',
      recipientAddressDetail: '3동 2002호',
      deliveryMessage: '경비실 보관 불가능합니다. 반드시 직접 전달 부탁드려요.'
    },
    {
      id: 5,
      itemName: '애니콩 마카롱 세트',
      recipientName: '강서연',
      recipientPhone: '010-5678-9012',
      recipientZipCode: '98765',
      recipientAddress: '인천광역시 중구 공항로 272',
      recipientAddressDetail: '',
      deliveryMessage: '빠른 배송 부탁드립니다'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(shippingData.length / itemsPerPage);

  // 현재 페이지 데이터
  const currentData = shippingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* 헤더 */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-[#674529]" />
          <h3 className="text-base font-semibold text-[#674529]">
            배송 목록 ({shippingData.length}건)
          </h3>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[20%]">
                품목명
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[8%]">
                받는분
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[10%]">
                연락처
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[6%]">
                우편번호
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[30%]">
                주소
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-[26%]">
                배송메시지
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id}>
                {/* 품목명 - 긴 텍스트 */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2" title={item.itemName}>
                    {item.itemName}
                  </div>
                </td>

                {/* 받는분 성명 - 5자 이내 */}
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.recipientName}
                  </div>
                </td>

                {/* 연락처 - 13자 */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-700">
                    {item.recipientPhone}
                  </div>
                </td>

                {/* 우편번호 - 5자 */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-700 font-mono">
                    {item.recipientZipCode}
                  </div>
                </td>

                {/* 주소 - 전체 주소 (기본 + 상세) */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    <div className="line-clamp-1" title={item.recipientAddress}>
                      {item.recipientAddress}
                    </div>
                    {item.recipientAddressDetail && (
                      <div className="text-gray-600 mt-0.5">
                        {item.recipientAddressDetail}
                      </div>
                    )}
                  </div>
                </td>

                {/* 배송메시지 - 길 수도 있음 */}
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-600 line-clamp-2" title={item.deliveryMessage}>
                    {item.deliveryMessage || '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === idx + 1
                      ? 'bg-[#674529] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingList;
