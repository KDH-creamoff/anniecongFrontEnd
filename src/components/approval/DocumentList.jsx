import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileText, Download, ChevronDown } from 'lucide-react';
import { 
  selectApprovalInbox, 
  selectApprovalInboxLoading 
} from '../../store/modules/approval/selectors';

const DocumentList = () => {
  const approvals = useSelector(selectApprovalInbox);
  const isLoading = useSelector(selectApprovalInboxLoading);
  
  const [filters, setFilters] = useState({
    status: '전체',
    searchTerm: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleReset = () => {
    setFilters({
      status: '전체',
      searchTerm: '',
    });
  };

  // const approvals = [
  //   {
  //     id: 1,
  //     docNumber: 'DOC-2024-0001',
  //     title: '1월 1주차 생산 원료 보고서',
  //     type: '생산 원료 보고서',
  //     status: '결재중',
  //     statusColor: 'bg-[#ffedd4] text-[#f65814]',
  //     author: '김생산',
  //     createdDate: '2024-01-15',
  //     approvalSteps: [
  //       { step: 1, status: 'completed' },
  //       { step: 2, status: 'pending' },
  //       { step: 3, status: 'waiting' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     docNumber: 'DOC-2024-0002',
  //     title: '제품 불량 발생 보고서',
  //     type: '불량 보고서',
  //     status: '반려',
  //     statusColor: 'bg-[#f8d7da] text-[#dc3545]',
  //     author: '이품질',
  //     createdDate: '2024-01-14',
  //     approvalSteps: [
  //       { step: 1, status: 'completed' },
  //       { step: 2, status: 'rejected' },
  //       { step: 3, status: 'waiting' },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     docNumber: 'DOC-2024-0003',
  //     title: '안전점검표 (1월 2주차)',
  //     type: '안전점검표',
  //     status: '승인완료',
  //     statusColor: 'bg-[#d4edda] text-[#28a745]',
  //     author: '안전관리자',
  //     createdDate: '2024-01-12',
  //     approvalSteps: [
  //       { step: 1, status: 'completed' },
  //       { step: 2, status: 'completed' },
  //       { step: 3, status: 'completed' },
  //     ],
  //   },
  // ];

  const documentStatuses = ['전체', '결재중', '반려', '승인완료'];

  const getStatusText = (status) => {
    const statusMap = {
      'pending': '결재중',
      'approved': '승인완료',
      'rejected': '반려'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': 'bg-[#ffedd4] text-[#f65814]',
      'approved': 'bg-[#d4edda] text-[#28a745]',
      'rejected': 'bg-[#f8d7da] text-[#dc3545]'
    };
    return colorMap[status] || 'bg-gray-200 text-gray-700';
  };

  // 필터링 로직
  const filteredDocuments = approvals.filter((doc) => {
    // 상태 필터
    if (filters.status !== '전체') {
      const statusText = getStatusText(doc.status);
      if (statusText !== filters.status) {
        return false;
      }
    }

    // 검색어 필터
    if (filters.searchTerm.trim()) {
      const search = filters.searchTerm.toLowerCase().trim();
      const docNumber = (doc.docNumber || '').toLowerCase();
      const title = (doc.title || '').toLowerCase();
      const type = (doc.type || '').toLowerCase();
      const author = (doc.author || doc.requester || '').toLowerCase();
      const createdDate = (doc.createdAt || '').toLowerCase();

      if (!docNumber.includes(search) && !title.includes(search) && 
          !type.includes(search) && !author.includes(search) && 
          !createdDate.includes(search)) {
        return false;
      }
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white shadow-sm p-8">
        <div className="text-center text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 필터 및 검색 섹션 */}
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center space-x-2'>
          <h3 className='text-base font-semibold text-[#674529]'>필터 및 검색</h3>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>

          {/* 결재 상태 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-[#000]'>
              결재 상태
            </label>
            <div className='relative'>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
              >
                {documentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#674529]' />
            </div>
          </div>

          {/* 검색 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-[#000]'>
              검색
            </label>
            <input
              type='text'
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder='문서번호, 제목, 유형, 작성자, 작성일'
              className='w-full rounded-xl border border-gray-300 px-4 py-2.5 placeholder-gray-400 outline-none'
            />
          </div>

          {/* 초기화 버튼 */}
          <div className='flex items-end'>
            <button
              onClick={handleReset}
              className='w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 font-medium text-[#000] transition-colors hover:bg-gray-50'
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 문서 목록 */}
      <div className='overflow-hidden rounded-xl bg-white shadow-sm'>
        <div className='border-b border-gray-200 bg-[#FEF3E8] px-6 py-4'>
          <div className='flex items-center space-x-2'>
            <FileText className='h-5 w-5 text-[#674529]' />
            <h3 className='text-base font-semibold text-[#674529]'>
              전체 결재 문서 ({filteredDocuments.length}건
              {approvals.length !== filteredDocuments.length && ` / ${approvals.length}건`})
            </h3>
          </div>
          <p className='mt-1 text-sm text-gray-600'>
            시스템에 등록된 모든 결재 문서 목록입니다
          </p>
        </div>

        <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                문서번호
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                제목
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                유형
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                상태
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                작성자
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                작성일
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                진행단계
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                작업
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {filteredDocuments.map((doc) => (
              <tr
                key={doc.id}
                className='transition-colors hover:bg-gray-50/50'
              >
                <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                  {doc.docNumber}
                </td>
                <td className='px-4 py-4 text-sm text-gray-900'>{doc.title}</td>
                <td className='px-4 py-4 text-sm text-gray-700'>{doc.type}</td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex rounded px-3 py-1 text-xs font-medium ${doc.statusColor}`}
                  >
                    {getStatusText(doc.status)}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {doc.author}
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {doc.createdDate ? new Date(doc.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center space-x-2'>
                    {doc.approvalSteps.map((stepData, index) => (
                      <div
                        key={index}
                        className='flex items-center'
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                            stepData.status === 'completed'
                              ? 'bg-[#d4edda] text-[#28a745]'
                              : stepData.status === 'pending'
                                ? 'bg-[#ffedd4] text-[#f65814]'
                                : stepData.status === 'rejected'
                                  ? 'bg-[#f8d7da] text-[#dc3545]'
                                  : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {stepData.step}
                        </div>
                        {index < doc.approvalSteps.length - 1 && (
                          <div className='mx-1 text-gray-400'>→</div>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className='px-4 py-4'>
                  {doc.status === 'approved' && (
                    <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                      <Download className='h-5 w-5' />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default DocumentList;
