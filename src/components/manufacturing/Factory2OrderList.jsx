import { useState } from "react";

const Factory2OrderList = () => {
    const [filterType, setFilterType] = useState('전체');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState('작업 내용'); // '작업 내용' or 'BOM'
    const [selectedManager, setSelectedManager] = useState('');
    const [selectedManagerBom, setSelectedManagerBom] = useState('');

    // BOM 선택 옵션
    const bomOptions = ['콩부장 쿠키', '맛있는 닭기슴살', '강아지 간식', '단호박과자'];

    // 담당자 선택 옵션
    const managerOptions = ['대표', '이사', '팀장', '직원', '알바'];

    // 담당자별 이름 매핑
    const namesByManager = {
    '대표': ['김대표', '박대표', '이대표'],
    '이사': ['최이사', '정이사', '강이사'],
    '팀장': ['나팀장', '윤팀장', '송팀장'],
    '직원': ['홍직원', '조직원', '한직원'],
    '알바': ['김알바', '이알바', '박알바']
    };

    const workOrders = [
    {
        id: 'WIP001',
        title: '애니콩 펫베이커리',
        product: '애니콩 펫베이커리 - 10개',
        material: '닭고기 (가슴살)',
        quantity: '50 kg',
        deadlineTime: '60분',
        manager: '김전처리',
    },
    {
        id: 'WIP002',
        title: '콩부장 쿠키',
        product: '콩부장 쿠키 - 150개',
        material: '콩',
        quantity: '100 kg',
        deadlineTime: '90분',
        manager: '나작업',
    },
    ];

    return (
    <div>
        <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#674529]">제조 지시서 목록</h3>
            <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-[#674529] text-white text-sm font-medium rounded hover:bg-[#553821] transition-colors"
            >
            제조 지시서 작성
            </button>
        </div>

        <div className="mb-6">
            <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none"
            >
            <option value="전체">전체</option>
            <option value="내 작업">내 작업</option>
            </select>
        </div>

        <div className="space-y-6">
            {workOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{order.title}</h4>
                    <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">작업자: {order.manager}</p>
                </div>
                </div>

                <div className="grid grid-cols-4 gap-x-8 gap-y-3 text-sm">
                <div className="justify-between">
                    <span className="text-gray-600">원재료코드</span>
                    <p className="text-gray-900 font-medium">{order.id}</p>
                </div>
                <div className="justify-between">
                    <span className="text-gray-600">원재료명</span>
                    <p className="text-gray-900 font-medium">{order.material}</p>
                </div>
                <div className="justify-between">
                    <span className="text-gray-600">필요량</span>
                    <p className="text-gray-900 font-medium">{order.quantity}</p>
                </div>              
                <div className="justify-between">
                    <span className="text-gray-600">작업예정시간</span>
                    <p className="text-gray-900 font-medium">{order.deadlineTime}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* 작업 지시서 작성 모달 */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-6">작업 지시서</h2>

            {/* 작업 내용 폼 */}
                <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">제목</label>
                    <input
                    type="text"
                    placeholder="Title"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">작업 내용</label>
                    <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                    <option>세척</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">원재료명</label>
                    <input
                    type="text"
                    placeholder="딸기"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">작업량</label>
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
                    <label className="w-20 text-sm text-gray-700">작업 예정시간</label>
                    <input
                    type="text"
                    placeholder="30"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    maxLength={10}
                    />
                    <span className="text-sm text-gray-600">분</span>
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">담당자</label>
                    <select
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                    <option value="">담당자 선택</option>
                    {managerOptions.map((manager) => (
                        <option key={manager} value={manager}>
                        {manager}
                        </option>
                    ))}
                    </select>
                </div>
                    <div className="flex items-center gap-4">
                        <label className="w-20 text-sm text-gray-700">이름</label>
                        <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                            <option value="">이름 선택</option>
                            {namesByManager[selectedManager]?.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>

            {/* BOM 폼 */}
            {formType === 'BOM' && (
                <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">제목</label>
                    <input
                    type="text"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">BOM</label>
                    <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                    <option value="">BOM 선택</option>
                    {bomOptions.map((bom) => (
                        <option key={bom} value={bom}>
                        {bom}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">수량</label>
                    <input
                    type="text"
                    defaultValue="1"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">작업 예정일</label>
                    <input
                    type="date"
                    defaultValue="2025-10-21"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">담당자</label>
                    <select
                    value={selectedManagerBom}
                    onChange={(e) => setSelectedManagerBom(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                    <option value="">담당자 선택</option>
                    {managerOptions.map((manager) => (
                        <option key={manager} value={manager}>
                        {manager}
                        </option>
                    ))}
                    </select>
                </div>

                {selectedManagerBom && (
                    <div className="flex items-center gap-4">
                    <label className="w-20 text-sm text-gray-700">이름</label>
                    <select className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
                        <option value="">이름 선택</option>
                        {namesByManager[selectedManagerBom]?.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                        ))}
                    </select>
                    </div>
                )}
                </div>
            )}

            {/* 버튼 */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                >
                취소
                </button>
                <button className="px-8 py-2 bg-[#674529] text-white text-sm rounded hover:bg-[#553821] transition-colors">
                작업 지시서 등록
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
    );
}

export default Factory2OrderList;