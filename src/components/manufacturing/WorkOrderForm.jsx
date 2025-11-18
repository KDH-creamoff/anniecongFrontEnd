import { useState } from 'react';

const WorkOrderForm = () => {
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedManagerBom, setSelectedManagerBom] = useState('');
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedFactoryBom, setSelectedFactoryBom] = useState('');

  // BOM 선택 옵션
  const bomOptions = ['콩부장 쿠키', '맛있는 닭기슴살', '강아지 간식', '단호박과자'];

  // 담당자 선택 옵션
  const managerOptions = ['대표', '이사', '팀장', '직원', '알바'];

  // 담당자별 이름 매핑
  const namesByManager = {
    '대표': ['김대표'],
    '이사': ['최이사', '정이사', '강이사'],
    '팀장': ['나팀장', '윤팀장', '송팀장'],
    '직원': ['홍직원', '조직원', '한직원'],
    '알바': ['김알바', '이알바', '박알바']
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl text-[#674529] mb-6">작업 지시서 등록</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* 좌측 - 작업 내용 */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-base font-semibold text-[#674529] mb-4 text-center">작업 내용</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">공장</label>
              <select
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>공장 선택</option>
                <option>1공장</option>
                <option>2공장</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">제목</label>
              <input
                type="text"
                placeholder="Title"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 내용</label>
              <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                <option>세척</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">원재료명</label>
              <input
                type="text"
                placeholder="딸기"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업량</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="100"
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <span className="text-sm text-gray-600">kg</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 예정일</label>
              <input
                type="date"
                defaultValue="2025-10-21"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">담당자</label>
              <select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>담당자 선택</option>
                {managerOptions.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            {selectedManager && (
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이름</label>
                <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                  <option value="" disabled hidden>이름 선택</option>
                  {namesByManager[selectedManager]?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button className="px-8 py-2 bg-[#674529] text-white text-sm rounded hover:bg-[#553821] transition-colors">
                작업 지시서 등록
              </button>
            </div>
          </div>
        </div>

        {/* 우측 - BOM */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-base font-semibold text-[#674529] mb-4 text-center">BOM</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">공장</label>
              <select
                value={selectedFactoryBom}
                onChange={(e) => setSelectedFactoryBom(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>공장 선택</option>
                <option>1공장</option>
                <option>2공장</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">제목</label>
              <input
                type="text"
                placeholder="Title"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">BOM</label>
              <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                <option value="" disabled hidden>BOM 선택</option>
                {bomOptions.map((bom) => (
                  <option key={bom} value={bom}>
                    {bom}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">수량</label>
              <input
                type="text"
                defaultValue="1"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 예정일</label>
              <input
                type="date"
                defaultValue="2025-10-21"
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">담당자</label>
              <select
                value={selectedManagerBom}
                onChange={(e) => setSelectedManagerBom(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>담당자 선택</option>
                {managerOptions.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            {selectedManagerBom && (
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이름</label>
                <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                  <option value="" disabled hidden>이름 선택</option>
                  {namesByManager[selectedManagerBom]?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button className="px-8 py-2 bg-[#674529] text-white text-sm rounded hover:bg-[#553821] transition-colors">
                작업 지시서 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderForm;
