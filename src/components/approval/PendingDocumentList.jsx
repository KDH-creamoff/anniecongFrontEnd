import { useDispatch, useSelector } from 'react-redux';
import { FileText, Calendar, User, CheckCircle, XCircle, Eye } from 'lucide-react';
import { 
    selectApprovalInbox, 
    selectApprovalInboxLoading,
    selectApproveOperationLoading,
    selectRejectOperationLoading 
} from '../../store/modules/approval/selectors';
import { approveRequest, rejectRequest } from '../../store/modules/approval/actions';

const PendingDocumentList = () => {
    const dispatch = useDispatch();
    const approvals = useSelector(selectApprovalInbox);
    const isLoading = useSelector(selectApprovalInboxLoading);
    const isApproving = useSelector(selectApproveOperationLoading);
    const isRejecting = useSelector(selectRejectOperationLoading);

    // API에서 배열이 온다고 가정 (saga에서 처리됨)
    const approvalsArray = Array.isArray(approvals) ? approvals : [];
    const pendingData = approvalsArray.filter(doc => doc.status === 'pending');

    const handleApprove = (id) => {
        if (window.confirm('이 문서를 승인하시겠습니까?')) {
            dispatch(approveRequest.request({ id }));
        }
    };

    // const pendingData = [
    //     {
    //         id: 1,
    //         docNumber: 'DOC-2024-0001',
    //         title: '불량 보고서',
    //         document: '불량 보고서',
    //         user: '현재사용자',
    //         badge: '결재 대기',
    //         createdDate: '2024-01-15'
    //     },
    //     {
    //         id: 2,
    //         docNumber: 'DOC-2024-0002',
    //         title: '1공장 생산 완료',
    //         document: '생산 완료 보고서',
    //         user: '현재사용자',
    //         badge: '결재 대기',
    //         createdDate: '2024-01-14'
    //     },
    // ]

    const handleReject = (id) => {
        const reason = window.prompt('반려 사유를 입력하세요:');
        if (reason) {
            dispatch(rejectRequest.request({ id, data: { reason } }));
        }
    };

    const handleViewDetail = (id) => {
        // 상세보기 로직 (모달 또는 페이지 이동)
        console.log('View detail:', id);
    };

    if (isLoading) {
    return (
        <div className="rounded-xl bg-white shadow-sm p-8">
            <div className="text-center text-gray-500">로딩 중...</div>
        </div>
    );
    }

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
                {pendingData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        결재 대기 중인 문서가 없습니다
                    </div>
                ) : (
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
                                    <button 
                                        onClick={() => handleApprove(item.id)}
                                        disabled={isApproving || isRejecting}      
                                        className="flex items-center gap-2 px-4 py-2 bg-[#d4edda] text-[#28a745] rounded-xl hover:bg-[#c3e6cb] transition-colors text-sm font-medium"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        {isApproving ? '처리중...' : '승인'}
                                    </button>
                                    <button 
                                        onClick={() => handleReject(item.id)}
                                        disabled={isApproving || isRejecting}
                                        className="flex items-center gap-2 px-4 py-2 bg-white text-[#dc3545] border border-[#dc3545] rounded-xl hover:bg-[#f8d7da] transition-colors text-sm font-medium"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        {isRejecting ? '처리중...' : '반려'}
                                    </button>
                                    <button 
                                        onClick={() => handleViewDetail(item.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white text-[#674529] border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                                    >
                                        <Eye className="h-4 w-4" />
                                        상세보기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PendingDocumentList;