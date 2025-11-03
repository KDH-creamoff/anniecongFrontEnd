import { FileText, Eye, Download } from 'lucide-react';

const SubmittedDocumentList = () => {
  const documents = [
    {
      id: 1,
      docNumber: 'DOC-2024-0001',
      title: '1월 1주차 생산 원료 보고서',
      type: '생산 원료 보고서',
      status: '결재중',
      statusColor: 'bg-[#ffedd4] text-[#f65814]',
      createdDate: '2024-01-15',
      approvalSteps: [
        { step: 1, status: 'completed' },
        { step: 2, status: 'pending' },
        { step: 3, status: 'waiting' },
      ],
    },
    {
      id: 2,
      docNumber: 'DOC-2024-0002',
      title: '제품 불량 발생 보고서',
      type: '불량 보고서',
      status: '반려',
      statusColor: 'bg-[#f8d7da] text-[#dc3545]',
      createdDate: '2024-01-14',
      approvalSteps: [
        { step: 1, status: 'completed' },
        { step: 2, status: 'rejected' },
        { step: 3, status: 'waiting' },
      ],
    },
    {
      id: 3,
      docNumber: 'DOC-2024-0003',
      title: '안전점검표 (1월 2주차)',
      type: '안전점검표',
      status: '승인완료',
      statusColor: 'bg-[#d4edda] text-[#28a745]',
      createdDate: '2024-01-12',
      approvalSteps: [
        { step: 1, status: 'completed' },
        { step: 2, status: 'completed' },
        { step: 3, status: 'completed' },
      ],
    },
  ];

  return (
    <div className='overflow-hidden rounded-xl bg-white shadow-sm'>
      <div className='border-b border-gray-200 bg-[#FEF3E8] px-6 py-4'>
        <div className='flex items-center space-x-2'>
          <FileText className='h-5 w-5 text-[#674529]' />
          <h3 className='text-base font-semibold text-[#674529]'>
            전체 결재 문서
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
            {documents.map((doc) => (
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
                    {doc.status}
                  </span>
                </td>
                <td className='px-4 py-4 text-sm text-gray-700'>
                  {doc.createdDate}
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
                  <div className='flex items-center space-x-2'>
                    <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                      <Eye className='h-5 w-5' />
                    </button>
                    {doc.status === '승인완료' && (
                      <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                        <Download className='h-5 w-5' />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmittedDocumentList;