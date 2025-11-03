

const PendingDocumentList = () => {
    const pendingData = [
        {
            id: 1,
            title: '제목',
            document: '불량 보고서',
            user: '현재사용자',
            badge: '결재 대기'
        },
        {
            id: 2,
            title: '1공장 생산 완료',
            document: '생산 완료 보고서',
            user: '현재사용자',
            badge: '결재 대기'
        },
    ]

    return (
        <div className="w-full bg-white p-6">
            {/* 헤더 */}
                <p className="text-gray-800 font-medium mb-6">내 결재 대기 문서</p>

            {/* 문서 리스트 */}
            <div className="space-y-4">
                {pendingData.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                        {/* 상단 영역 */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <div className="flex items-center text-sm text-gray-600 gap-2">
                                    <span className="font-medium">{item.document}</span>
                                    <span>•</span>
                                    <span>{item.user}</span>
                                </div>
                            </div>
                            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                                {item.badge}
                            </span>
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                승인
                            </button>
                            <button className="flex items-center gap-1 px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md hover:bg-red-50 transition-colors text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                반려
                            </button>
                            <button className="flex items-center gap-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                상세보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingDocumentList;