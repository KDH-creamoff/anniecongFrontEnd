import React, { useState } from 'react';

const WorkOrderManagement = () => {
  const [selectedFactory, setSelectedFactory] = useState('1공장');
  const [searchTerm, setSearchTerm] = useState('');

  // 샘플 데이터
  const workOrders = {
    '1공장': [
      { id: 1, item: '원재료 입고' },
      { id: 2, item: '절단' },
      { id: 3, item: '세척' },
      { id: 4, item: '전처리' },
      { id: 5, item: '농산물 가공' }
    ],
    '2공장': [
      { id: 6, item: '혼합' },
      { id: 7, item: '배합' },
      { id: 8, item: '조리 베이킹' },
      { id: 9, item: '포장' },
      { id: 10, item: '냉동보관' }
    ]
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#674529] mb-6">작업내용추가</h2>
        {/* 작업 내용 등록 섹션 */}
        <h3 className="text-lg text-[#674529] mb-4">작업 내용 등록</h3>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">공장</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
              >
                <option value="1공장">1공장</option>
                <option value="2공장">2공장</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <label className="text-gray-700 font-medium">작업내용</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="작업내용을 입력하세요"
              />
            </div>

            <button className="bg-[#674529] text-white px-6 py-2 rounded hover:bg-[#8B6F47] transition-colors">
              등록하기
            </button>
          </div>
        </div>
      <h3 className="text-lg text-[#674529] mb-4">작업 내용 목록</h3>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* 작업 내용 목록 섹션 */}
        <div>
          <div className="grid grid-cols-2 gap-6">
            {/* 1공장 */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                1공장
              </h4>
              <ul className="space-y-2">
                {workOrders['1공장'].map((order) => (
                  <li key={order.id} className="flex items-center justify-between py-2 px-2 rounded">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">{order.item}</span>
                    </span>
                    <button className="text-red-500 text-sm hover:text-red-600">
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2공장 */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                2공장
              </h4>
              <ul className="space-y-2">
                {workOrders['2공장'].map((order) => (
                  <li key={order.id} className="flex items-center justify-between py-2 px-2 rounded">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">{order.item}</span>
                    </span>
                    <button className="text-red-500 text-sm hover:text-red-600">
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderManagement;
