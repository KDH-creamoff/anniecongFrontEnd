import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FileText, Download, Calendar, User, ChevronDown, CheckSquare, Square, Archive } from 'lucide-react';
import Pagination from '../common/Pagination';
import {
    selectApprovalInbox,
    selectApprovalInboxLoading,
} from '../../store/modules/approval/selectors';
import { fetchApprovalInbox } from '../../store/modules/approval/actions';

const ArchivedDocumentList = () => {
    const dispatch = useDispatch();
    const rawApprovals = useSelector(selectApprovalInbox);
    const isLoading = useSelector(selectApprovalInboxLoading);

    const [filters, setFilters] = useState({
        documentType: '전체',
        sortOrder: '최신순',
        searchTerm: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 체크박스 선택 상태
    const [selectedDocs, setSelectedDocs] = useState(new Set());

    // ZIP 다운로드 로딩 상태
    const [isDownloadingZip, setIsDownloadingZip] = useState(false);

    // 목데이터 생성 (10개)
    const mockDocuments = useMemo(() => [
        { id: 'DOC-001', docNumber: 'DOC-001', title: 'HACCP 표준서 - 위생관리', type: 'Maintenance', author: '김철수', approver: '박영희', createdDate: '2025. 10. 15.', createdDateRaw: '2025-10-15', approvedDate: '2025. 10. 20.', approvedDateRaw: '2025-10-20' },
        { id: 'DOC-002', docNumber: 'DOC-002', title: '생산 설비 유지보수 점검표', type: 'Maintenance', author: '이영수', approver: '최민지', createdDate: '2025. 10. 18.', createdDateRaw: '2025-10-18', approvedDate: '2025. 10. 22.', approvedDateRaw: '2025-10-22' },
        { id: 'DOC-003', docNumber: 'DOC-003', title: '품질관리 기록서', type: 'Quality', author: '박지훈', approver: '김영희', createdDate: '2025. 10. 20.', createdDateRaw: '2025-10-20', approvedDate: '2025. 10. 25.', approvedDateRaw: '2025-10-25' },
        { id: 'DOC-004', docNumber: 'DOC-004', title: '원자재 입고 검사 기록', type: 'Inspection', author: '정민수', approver: '이상훈', createdDate: '2025. 10. 22.', createdDateRaw: '2025-10-22', approvedDate: '2025. 10. 27.', approvedDateRaw: '2025-10-27' },
        { id: 'DOC-005', docNumber: 'DOC-005', title: '제품 생산 관리 대장', type: 'Production', author: '홍길동', approver: '박영희', createdDate: '2025. 10. 25.', createdDateRaw: '2025-10-25', approvedDate: '2025. 10. 30.', approvedDateRaw: '2025-10-30' },
        { id: 'DOC-006', docNumber: 'DOC-006', title: '부적합품 발생 보고서', type: 'Quality', author: '김민지', approver: '최민지', createdDate: '2025. 10. 28.', createdDateRaw: '2025-10-28', approvedDate: '2025. 11. 1.', approvedDateRaw: '2025-11-01' },
        { id: 'DOC-007', docNumber: 'DOC-007', title: '창고 점검 체크리스트', type: 'Inspection', author: '이철수', approver: '김영희', createdDate: '2025. 11. 1.', createdDateRaw: '2025-11-01', approvedDate: '2025. 11. 5.', approvedDateRaw: '2025-11-05' },
        { id: 'DOC-008', docNumber: 'DOC-008', title: '위생 교육 훈련 계획서', type: 'Training', author: '박수진', approver: '이상훈', createdDate: '2025. 11. 3.', createdDateRaw: '2025-11-03', approvedDate: '2025. 11. 7.', approvedDateRaw: '2025-11-07' },
        { id: 'DOC-009', docNumber: 'DOC-009', title: '소독 실시 기록', type: 'Hygiene', author: '최영호', approver: '박영희', createdDate: '2025. 11. 5.', createdDateRaw: '2025-11-05', approvedDate: '2025. 11. 9.', approvedDateRaw: '2025-11-09' },
        { id: 'DOC-010', docNumber: 'DOC-010', title: 'CCP 모니터링 일지', type: 'Monitoring', author: '정수진', approver: '최민지', createdDate: '2025. 11. 8.', createdDateRaw: '2025-11-08', approvedDate: '2025. 11. 12.', approvedDateRaw: '2025-11-12' },
    ], []);

    useEffect(() => {
        if (!isLoading && (!rawApprovals || rawApprovals.length === 0)) {
            dispatch(fetchApprovalInbox.request());
        }
    }, [dispatch, isLoading, rawApprovals]);

    const archivedDocuments = useMemo(
        () => {
            // API에서 배열이 온다고 가정 (saga에서 처리됨)
            const approvals = Array.isArray(rawApprovals) ? rawApprovals : [];
            
            // 실제 데이터가 있으면 사용, 없으면 목데이터 사용
            const realDocs = approvals
                .filter(isApprovedDocument)
                .map(mapToArchivedDocument)
                .filter(Boolean);
            
            return realDocs.length > 0 ? realDocs : mockDocuments;
        },
        [rawApprovals, mockDocuments],
    );

    const documentTypeOptions = useMemo(() => {
        const types = new Set();
        archivedDocuments.forEach((doc) => {
            if (doc.type) {
                types.add(doc.type);
            }
        });
        return ['전체', ...Array.from(types)];
    }, [archivedDocuments]);

    const sortOptions = ['최신순', '오래된순'];

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({
            documentType: '전체',
            sortOrder: '최신순',
            searchTerm: '',
        });
        setCurrentPage(1);
    };

    const filteredAndSortedDocuments = useMemo(() => {
        let filtered = archivedDocuments.filter((doc) => {
            if (filters.documentType !== '전체' && doc.type !== filters.documentType) {
                return false;
            }

            if (filters.searchTerm.trim()) {
                const search = filters.searchTerm.toLowerCase().trim();
                const docNumber = (doc.docNumber || '').toLowerCase();
                const title = (doc.title || '').toLowerCase();
                const type = (doc.type || '').toLowerCase();
                const author = (doc.author || '').toLowerCase();

                if (
                    !docNumber.includes(search) &&
                    !title.includes(search) &&
                    !type.includes(search) &&
                    !author.includes(search)
                ) {
                    return false;
                }
            }

            return true;
        });

        if (filters.sortOrder === '최신순') {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.approvedDateRaw || b.createdDateRaw || 0) - new Date(a.approvedDateRaw || a.createdDateRaw || 0),
            );
        } else if (filters.sortOrder === '오래된순') {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.approvedDateRaw || a.createdDateRaw || 0) - new Date(b.approvedDateRaw || b.createdDateRaw || 0),
            );
        }

        return filtered;
    }, [archivedDocuments, filters]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredAndSortedDocuments.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDocuments = filteredAndSortedDocuments.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 체크박스 핸들러
    const handleSelectAll = () => {
        if (selectedDocs.size === currentDocuments.length) {
            setSelectedDocs(new Set());
        } else {
            setSelectedDocs(new Set(currentDocuments.map(doc => doc.id)));
        }
    };

    const handleSelectDoc = (docId) => {
        const newSelected = new Set(selectedDocs);
        if (newSelected.has(docId)) {
            newSelected.delete(docId);
        } else {
            newSelected.add(docId);
        }
        setSelectedDocs(newSelected);
    };

    // PDF HTML 생성 함수 (HaccpStandardForm 템플릿 사용)
    const generateDocumentHTML = (doc) => {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${doc.title}</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
                        padding: 20px;
                        background: white;
                    }
                    .document-container {
                        max-width: 800px;
                        margin: 0 auto;
                        border: 2px solid #333;
                        padding: 30px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 3px solid #333;
                        padding-bottom: 20px;
                    }
                    .header h1 {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .header .doc-number {
                        font-size: 16px;
                        color: #666;
                    }
                    .info-section {
                        margin-bottom: 20px;
                        border: 1px solid #ddd;
                        padding: 15px;
                        background: #f9f9f9;
                    }
                    .info-row {
                        display: flex;
                        margin-bottom: 8px;
                    }
                    .info-label {
                        width: 120px;
                        font-weight: bold;
                        color: #333;
                    }
                    .info-value {
                        flex: 1;
                        color: #555;
                    }
                    .content-section {
                        margin: 30px 0;
                        min-height: 300px;
                        border: 1px solid #ddd;
                        padding: 20px;
                    }
                    .content-title {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                    }
                    .content-body {
                        line-height: 1.8;
                        color: #444;
                    }
                    .signature-section {
                        margin-top: 40px;
                        display: flex;
                        justify-content: space-around;
                        border-top: 2px solid #333;
                        padding-top: 30px;
                    }
                    .signature-box {
                        text-align: center;
                    }
                    .signature-label {
                        font-weight: bold;
                        margin-bottom: 10px;
                        font-size: 14px;
                    }
                    .signature-name {
                        margin-top: 40px;
                        border-top: 1px solid #333;
                        padding-top: 5px;
                        min-width: 100px;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="document-container">
                    <div class="header">
                        <h1>${doc.title}</h1>
                        <div class="doc-number">문서번호: ${doc.docNumber}</div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-row">
                            <div class="info-label">문서 유형:</div>
                            <div class="info-value">${doc.type}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">작성자:</div>
                            <div class="info-value">${doc.author}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">작성일:</div>
                            <div class="info-value">${doc.createdDate}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">승인일:</div>
                            <div class="info-value">${doc.approvedDate}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">최종 승인자:</div>
                            <div class="info-value">${doc.approver}</div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <div class="content-title">문서 내용</div>
                        <div class="content-body">
                            <p>본 문서는 ${doc.type} 관련 ${doc.title} 문서입니다.</p>
                            <br>
                            <p>작성자 ${doc.author}에 의해 ${doc.createdDate}에 작성되었으며,</p>
                            <p>${doc.approver}에 의해 ${doc.approvedDate}에 최종 승인되었습니다.</p>
                            <br>
                            <p>본 문서는 HACCP 시스템에 따라 관리되며, 모든 관련 규정을 준수합니다.</p>
                            <br>
                            <p>문서번호: ${doc.docNumber}</p>
                        </div>
                    </div>
                    
                    <div class="signature-section">
                        <div class="signature-box">
                            <div class="signature-label">작성</div>
                            <div class="signature-name">${doc.author}</div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-label">검토</div>
                            <div class="signature-name">검토자</div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-label">승인</div>
                            <div class="signature-name">${doc.approver}</div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        이 문서는 자동으로 생성되었습니다. - ${new Date().toLocaleDateString('ko-KR')}
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    // ZIP 다운로드 핸들러
    const handleDownloadZip = async () => {
        if (selectedDocs.size === 0) {
            alert('다운로드할 문서를 선택해주세요.');
            return;
        }

        setIsDownloadingZip(true);
        console.log(`ZIP 다운로드 시작: ${selectedDocs.size}개 문서`);

        try {
            // 선택된 문서들의 HTML 생성
            const selectedDocuments = archivedDocuments.filter(doc => selectedDocs.has(doc.id));
            console.log('선택된 문서:', selectedDocuments.map(d => d.docNumber));
            console.log('선택된 문서 상세:', selectedDocuments);
            
            const documentsData = selectedDocuments.map(doc => {
                const html = generateDocumentHTML(doc);
                const filename = `${doc.docNumber}_${doc.title}.pdf`;
                console.log(`생성된 HTML - ${filename}:`, html.substring(0, 100) + '...');
                return { html, filename };
            });

            console.log('서버로 전송할 문서 수:', documentsData.length);
            console.log('서버로 요청 전송 중...');

            // 서버에 ZIP 생성 요청 (타임아웃 설정: 5분)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 300000); // 5분

            const response = await fetch('http://localhost:3001/api/generate-pdfs-zip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documents: documentsData,
                    zipFilename: `결재문서_${new Date().toISOString().split('T')[0]}.zip`
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('서버 응답 수신:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('서버 에러 응답:', errorText);
                throw new Error(`ZIP 파일 생성에 실패했습니다. (${response.status})`);
            }

            console.log('ZIP 파일 다운로드 중...');
            // ZIP 파일 다운로드
            const blob = await response.blob();
            console.log('ZIP 파일 크기:', blob.size, 'bytes');
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `결재문서_${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            console.log('ZIP 다운로드 완료');
            alert(`${selectedDocs.size}개의 문서가 ZIP 파일로 다운로드되었습니다.`);
            setSelectedDocs(new Set()); // 선택 초기화
        } catch (error) {
            console.error('ZIP 다운로드 에러:', error);
            
            if (error.name === 'AbortError') {
                alert('요청 시간이 초과되었습니다. 문서 수를 줄여서 다시 시도해주세요.');
            } else if (error.message.includes('Failed to fetch')) {
                alert('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
            } else {
                alert(`ZIP 파일 다운로드 중 오류가 발생했습니다.\n${error.message}`);
            }
        } finally {
            setIsDownloadingZip(false);
            console.log('ZIP 다운로드 프로세스 종료');
        }
    };

    // 개별 PDF 다운로드 핸들러
    const handleDownloadSinglePdf = async (doc) => {
        try {
            const html = generateDocumentHTML(doc);

            const response = await fetch('http://localhost:3001/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    html,
                    filename: `${doc.docNumber}_${doc.title}.pdf`
                })
            });

            if (!response.ok) {
                throw new Error('PDF 생성에 실패했습니다.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${doc.docNumber}_${doc.title}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('PDF 다운로드 에러:', error);
            alert('PDF 다운로드 중 오류가 발생했습니다.');
        }
    };

    if (isLoading && archivedDocuments.length === 0) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-gray-500">보관 문서를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center space-x-2">
                    <h3 className="text-base font-semibold text-[#674529]">필터 및 검색</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#000]">문서 유형</label>
                        <div className="relative">
                            <select
                                value={filters.documentType}
                                onChange={(e) => handleFilterChange('documentType', e.target.value)}
                                className="w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all"
                            >
                                {documentTypeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#000]">정렬</label>
                        <div className="relative">
                            <select
                                value={filters.sortOrder}
                                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                                className="w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#000]">검색</label>
                        <input
                            type="text"
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            placeholder="문서번호, 제목, 유형, 작성자"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 placeholder-gray-400 outline-none"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleReset}
                            className="w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 font-medium text-[#000] transition-colors hover:bg-gray-50"
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-[#FEF3E8] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-[#674529]" />
                                <h3 className="text-base font-semibold text-[#674529]">
                                    보관 문서 목록 ({filteredAndSortedDocuments.length}건
                                    {archivedDocuments.length !== filteredAndSortedDocuments.length && ` / ${archivedDocuments.length}건`})
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">승인 완료되어 보관된 문서 목록입니다</p>
                        </div>
                        {selectedDocs.size > 0 && (
                            <button
                                onClick={handleDownloadZip}
                                disabled={isDownloadingZip}
                                className="flex items-center space-x-2 rounded-lg bg-[#674529] px-4 py-2 text-white transition-colors hover:bg-[#543620] disabled:opacity-50"
                            >
                                <Archive className="h-5 w-5" />
                                <span>
                                    {isDownloadingZip 
                                        ? '압축 중...' 
                                        : `압축하기 (${selectedDocs.size}건)`
                                    }
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                    <button
                                        onClick={handleSelectAll}
                                        className="inline-flex items-center justify-center"
                                        title={selectedDocs.size === currentDocuments.length ? '전체 해제' : '전체 선택'}
                                    >
                                        {selectedDocs.size === currentDocuments.length && currentDocuments.length > 0 ? (
                                            <CheckSquare className="h-5 w-5 text-[#674529]" />
                                        ) : (
                                            <Square className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">문서번호</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">제목</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">유형</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작성자</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작성일</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">승인일</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">최종 승인자</th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">다운로드</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentDocuments.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">
                                        보관된 문서가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                currentDocuments.map((doc) => (
                                    <tr key={doc.id} className="transition-colors hover:bg-gray-50/50">
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => handleSelectDoc(doc.id)}
                                                className="inline-flex items-center justify-center"
                                                title={selectedDocs.has(doc.id) ? '선택 해제' : '선택'}
                                            >
                                                {selectedDocs.has(doc.id) ? (
                                                    <CheckSquare className="h-5 w-5 text-[#674529]" />
                                                ) : (
                                                    <Square className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{doc.docNumber}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{doc.title}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700">{doc.type}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-700">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span>{doc.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>{doc.createdDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span>{doc.approvedDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700">{doc.approver}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleDownloadSinglePdf(doc)}
                                                    className="rounded-lg p-2 text-[#674529] transition-colors hover:bg-[#FEF3E8]"
                                                    title="문서 다운로드"
                                                    type="button"
                                                >
                                                    <Download className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={filteredAndSortedDocuments.length}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArchivedDocumentList;

const isApprovedDocument = (doc) => {
    const statusValue =
        doc?.status || doc?.approvalStatus || doc?.state || doc?.currentStatus || '';
    const normalizedStatus = statusValue.toString().trim().toLowerCase();
    const approvedStates = ['approved', '승인', '승인완료', 'completed', '완료', 'done'];
    return approvedStates.some((state) => normalizedStatus === state.toLowerCase());
};

const extractDisplayName = (value) => {
    if (!value) {
        return '-';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'object') {
        return value.name || value.fullName || value.username || value.email || value.displayName || '-';
    }

    return String(value);
};

const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return typeof value === 'string' ? value : '-';
    }

    return date.toLocaleDateString();
};

const mapToArchivedDocument = (doc) => {
    if (!doc) {
        return null;
    }

    const createdDateRaw =
        doc.createdAt || doc.createdDate || doc.created_at || doc.requestedAt || doc.submittedAt || null;
    const approvedDateRaw =
        doc.approvedAt || doc.approvedDate || doc.completedAt || doc.updatedAt || doc.finalizedAt || null;

    const docNumber =
        doc.docNumber ||
        doc.documentNumber ||
        doc.documentNo ||
        doc.number ||
        doc.code ||
        `DOC-${doc.id ?? 'UNKNOWN'}`;

    const id = doc.id ?? doc.documentId ?? doc.uuid ?? docNumber;

    return {
        id,
        docNumber,
        title: doc.title || doc.subject || doc.documentTitle || doc.name || '제목 없음',
        type: doc.type || doc.documentType || doc.category || doc.formType || '기타 문서',
        author: extractDisplayName(
            doc.author || doc.requester || doc.requesterName || doc.createdBy || doc.createdByName || doc.created_by,
        ),
        approver: extractDisplayName(
            doc.approver || doc.approverName || doc.approvedBy || doc.approvedByName || doc.approved_by,
        ),
        createdDate: formatDate(createdDateRaw),
        createdDateRaw,
        approvedDate: formatDate(approvedDateRaw),
        approvedDateRaw,
    };
};