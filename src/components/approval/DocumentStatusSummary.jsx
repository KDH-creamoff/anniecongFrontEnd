import { useSelector } from 'react-redux';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { selectApprovalInbox } from '../../store/modules/approval/selectors';

const DocumentStatusSummary = () => {
  const approvals = useSelector(selectApprovalInbox);

  //상태별 카운트 계산
  const totalCount = approvals.length;
  const pendingCount = approvals.filter(doc => doc.status === 'pending').length;
  const approvedCount = approvals.filter(doc => doc.status === 'approved').length;
  const rejectedCount = approvals.filter(doc => doc.status === 'rejected').length;

  const summaryCards = [
    {
      id: 1,
      title: '전체 문서',
      value: totalCount,
      icon: <FileText className='h-6 w-6' />,
      bgColor: 'bg-[#724323]',
      iconTextColor: 'text-[#fff]',
    },
    {
      id: 2,
      title: '결재 대기',
      value: pendingCount,
      icon: <Clock className='h-6 w-6' />,
      bgColor: 'bg-[#ffedd4]',
      iconTextColor: 'text-[#f65814]',
    },
    {
      id: 3,
      title: '승인 완료',
      value: approvedCount,
      icon: <CheckCircle className='h-6 w-6' />,
      bgColor: 'bg-[#d4edda]',
      iconTextColor: 'text-[#28a745]',
    },
    {
      id: 4,
      title: '반려',
      value: rejectedCount,
      icon: <XCircle className='h-6 w-6' />,
      bgColor: 'bg-[#f8d7da]',
      iconTextColor: 'text-[#dc3545]',
    },
  ];

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
      {summaryCards.map((card) => (
        <div
          key={card.id}
          className='rounded-xl bg-white p-6 shadow-sm'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='mb-1 text-sm text-gray-600'>{card.title}</p>
              <p className='text-3xl font-bold text-[#674529]'>{card.value}</p>
            </div>
            <div
              className={`h-14 w-14 ${card.bgColor} flex items-center justify-center rounded-xl`}
            >
              <div className={`${card.iconTextColor}`}>{card.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentStatusSummary;
