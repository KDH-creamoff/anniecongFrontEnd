import { Eye } from 'lucide-react';

const AccessLogList = () => {
  const logs = [
    {
      time: '2025-09-11 14:30',
      user: '관리자',
      action: '사용자 생성',
      module: '사용자관리',
      ipAddress: '192.168.1.100',
      result: '성공',
      resultBg: 'bg-green-100',
      resultText: 'text-green-700',
    },
    {
      time: '2025-09-11 13:20',
      user: '최제조',
      action: '제조지시 시작',
      module: '2공장 제조',
      ipAddress: '192.168.2.150',
      result: '성공',
      resultBg: 'bg-green-100',
      resultText: 'text-green-700',
    },
    {
      time: '2025-09-11 09:15',
      user: '김검수',
      action: '입고 검수',
      module: '입고관리',
      ipAddress: '192.168.1.120',
      result: '성공',
      resultBg: 'bg-green-100',
      resultText: 'text-green-700',
    },
    {
      time: '2025-09-11 08:45',
      user: '이전처리',
      action: '전처리 시작',
      module: '1공장 전처리',
      ipAddress: '192.168.1.110',
      result: '성공',
      resultBg: 'bg-green-100',
      resultText: 'text-green-700',
    },
    {
      time: '2025-09-10 18:00',
      user: '박품질',
      action: '권한 없는 접근 시도',
      module: '사용자관리',
      ipAddress: '192.168.2.200',
      result: '실패',
      resultBg: 'bg-[#ffe2e2]',
      resultText: 'text-red-600',
    },
  ];

  return (
    <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
      {/* 헤더 */}
      <div className='p-4'>
        <div className='flex items-center space-x-2'>
          <Eye className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>접근 로그</h2>
        </div>
      </div>

      {/* 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200 bg-white'>
            <tr>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                시간
              </th>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                사용자
              </th>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                작업
              </th>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                모듈
              </th>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                IP 주소
              </th>
              <th className='text-s px-4 py-3 text-left font-semibold text-gray-600'>
                결과
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {logs.map((log, index) => (
              <tr key={index}>
                <td className='px-4 py-3 text-sm text-gray-900'>{log.time}</td>
                <td className='px-4 py-3 text-sm text-gray-900'>{log.user}</td>
                <td className='px-4 py-3 text-sm text-gray-900'>
                  {log.action}
                </td>
                <td className='px-4 py-3 text-sm text-gray-900'>
                  {log.module}
                </td>
                <td className='px-4 py-3 text-sm text-gray-900'>
                  {log.ipAddress}
                </td>
                <td className='px-4 py-3'>
                  <span
                    className={`rounded-xl px-2 py-1 text-sm font-medium ${log.resultText} ${log.resultBg}`}
                  >
                    {log.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessLogList;
