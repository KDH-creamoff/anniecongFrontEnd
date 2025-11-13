import { FileText, Calendar, User, CheckCircle, XCircle, Eye } from 'lucide-react';

const PendingDocumentList = () => {
    const pendingData = [
        {
            id: 1,
            docNumber: 'DOC-2024-0001',
            title: '불량 보고서',
            document: '불량 보고서',
            user: '현재사용자',
            badge: '결재 대기',
            createdDate: '2024-01-15'
        },
        {
            id: 2,
            docNumber: 'DOC-2024-0002',
            title: '1공장 생산 완료',
            document: '생산 완료 보고서',
            user: '현재사용자',
            badge: '결재 대기',
            createdDate: '2024-01-14'
        },
    ]

    return (
        <div className="rounded-xl bg-white shadow-sm">
            {/* 헤더 */}
            <div className="border-b border-gray-200 bg-[#FEF3E8] px-6 py-4">
                <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-[#674529]" />
                    <h3 className="text-base font-semibold text-[#674529]">
                        내 결재 대기 문서 ({pendingData.length}건)
                    </h3>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    결재 승인이 필요한 문서 목록입니다
                </p>
            </div>

            {/* 문서 리스트 */}
            <div className="p-6">
                <div className="space-y-4">
                    {pendingData.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                            {/* 상단 영역 */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-medium text-gray-500">{item.docNumber}</span>
                                        <span className="bg-[#ffedd4] text-[#f65814] px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#674529] mb-3">{item.title}</h3>
                                    <div className="flex items-center text-sm text-gray-600 gap-4">
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-4 w-4 text-gray-500" />
                                            <span>{item.document}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>{item.user}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>{item.createdDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="flex gap-2 pt-3 border-t border-gray-100">
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#d4edda] text-[#28a745] rounded-xl hover:bg-[#c3e6cb] transition-colors text-sm font-medium">
                                    <CheckCircle className="h-4 w-4" />
                                    승인
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#dc3545] border border-[#dc3545] rounded-xl hover:bg-[#f8d7da] transition-colors text-sm font-medium">
                                    <XCircle className="h-4 w-4" />
                                    반려
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#674529] border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                                    <Eye className="h-4 w-4" />
                                    상세보기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PendingDocumentList;