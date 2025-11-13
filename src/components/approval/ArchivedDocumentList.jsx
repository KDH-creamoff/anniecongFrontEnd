import { useState } from 'react';
import { FileText, Download, Calendar, User, ChevronDown } from 'lucide-react';

const ArchivedDocumentList = () => {
    const [filters, setFilters] = useState({
        type: '전체',
        searchTerm: '',
    });

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    const handleReset = () => {
        setFilters({
            type: '전체',
            searchTerm: '',
        });
    };

    const archivedDocuments = [
        {
            id: 1,
            docNumber: 'DOC-2024-0001',
            title: '1월 1주차 생산 원료 보고서',
            type: '생산 원료 보고서',
            author: '김생산',
            createdDate: '2024-01-15',
            approvedDate: '2024-01-17',
            approver: '이관리자'
        },
        {
            id: 2,
            docNumber: 'DOC-2024-0002',
            title: '안전점검표 (1월 2주차)',
            type: '안전점검표',
            author: '안전관리자',
            createdDate: '2024-01-12',
            approvedDate: '2024-01-13',
            approver: '박부장'
        },
        {
            id: 3,
            docNumber: 'DOC-2024-0003',
            title: '12월 재고 실사 보고서',
            type: '재고 실사 보고서',
            author: '재고담당',
            createdDate: '2024-01-10',
            approvedDate: '2024-01-11',
            approver: '최부장'
        },
    ];

    const documentTypes = ['전체', '생산 원료 보고서', '안전점검표', '재고 실사 보고서'];

    // 필터링 로직
    const filteredDocuments = archivedDocuments.filter((doc) => {
        // 유형 필터
        if (filters.type !== '전체' && doc.type !== filters.type) {
            return false;
        }

        // 검색어 필터
        if (filters.searchTerm.trim()) {
            const search = filters.searchTerm.toLowerCase().trim();
            const docNumber = doc.docNumber.toLowerCase();
            const title = doc.title.toLowerCase();
            const type = doc.type.toLowerCase();
            const author = doc.author.toLowerCase();

            if (!docNumber.includes(search) && !title.includes(search) && !type.includes(search) && !author.includes(search)) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="space-y-6">
            {/* 필터 및 검색 섹션 */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center space-x-2">
                    <h3 className="text-base font-semibold text-[#674529]">필터 및 검색</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* 문서 유형 */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#000]">
                            문서 유형
                        </label>
                        <div className="relative">
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all"
                            >
                                {documentTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]" />
                        </div>
                    </div>

                    {/* 검색 */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#000]">
                            검색
                        </label>
                        <input
                            type="text"
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            placeholder="문서번호, 제목, 유형, 작성자"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 placeholder-gray-400 outline-none"
                        />
                    </div>

                    {/* 초기화 버튼 */}
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

            {/* 문서 목록 */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-[#FEF3E8] px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-[#674529]" />
                        <h3 className="text-base font-semibold text-[#674529]">
                            보관 문서 목록 ({filteredDocuments.length}건
                            {archivedDocuments.length !== filteredDocuments.length && ` / ${archivedDocuments.length}건`})
                        </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                        승인 완료되어 보관된 문서 목록입니다
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    문서번호
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    제목
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    유형
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    작성자
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    작성일
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    승인일
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                    최종 승인자
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                    다운로드
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredDocuments.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="transition-colors hover:bg-gray-50/50"
                                >
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                        {doc.docNumber}
                                    </td>
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
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {doc.approver}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                className="rounded-lg p-2 text-[#674529] transition-colors hover:bg-[#FEF3E8]"
                                                title="문서 다운로드"
                                            >
                                                <Download className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ArchivedDocumentList;