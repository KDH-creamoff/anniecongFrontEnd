import { useState } from 'react';
import { Users, Trash2 } from 'lucide-react';
import Pagination from '../common/Pagination';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const users = [
    // 대표 1명
    {
      id: 'USR001',
      name: '김대표',
      email: 'kim.ceo@aniecong.com',
      role: '대표',
      roleBg: 'bg-purple-100',
      roleText: 'text-purple-700',
      department: '경영지원팀',
      accessLevel: 'ALL',
      isActive: true,
    },
    // 이사급
    {
      id: 'USR002',
      name: '이이사',
      email: 'lee.director@aniecong.com',
      role: '이사',
      roleBg: 'bg-blue-100',
      roleText: 'text-blue-700',
      department: '경영지원팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR003',
      name: '박이사',
      email: 'park.director@aniecong.com',
      role: '이사',
      roleBg: 'bg-blue-100',
      roleText: 'text-blue-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    // 팀장급
    {
      id: 'USR004',
      name: '최팀장',
      email: 'choi.manager@aniecong.com',
      role: '팀장',
      roleBg: 'bg-indigo-100',
      roleText: 'text-indigo-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR005',
      name: '정팀장',
      email: 'jung.manager@aniecong.com',
      role: '팀장',
      roleBg: 'bg-indigo-100',
      roleText: 'text-indigo-700',
      department: '경영지원팀',
      accessLevel: 'P1',
      isActive: true,
    },
    // 직원
    {
      id: 'USR006',
      name: '강직원',
      email: 'kang.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR007',
      name: '조직원',
      email: 'cho.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR008',
      name: '윤직원',
      email: 'yoon.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '경영지원팀',
      accessLevel: 'P1',
      isActive: false,
    },
    {
      id: 'USR009',
      name: '장직원',
      email: 'jang.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR010',
      name: '임직원',
      email: 'lim.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '경영지원팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR011',
      name: '한직원',
      email: 'han.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR012',
      name: '오직원',
      email: 'oh.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '경영지원팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR013',
      name: '서직원',
      email: 'seo.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: false,
    },
    {
      id: 'USR014',
      name: '신직원',
      email: 'shin.staff@aniecong.com',
      role: '직원',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    // 알바
    {
      id: 'USR015',
      name: '권알바',
      email: 'kwon.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR016',
      name: '황알바',
      email: 'hwang.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR017',
      name: '안알바',
      email: 'ahn.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '경영지원팀',
      accessLevel: 'P1',
      isActive: false,
    },
    {
      id: 'USR018',
      name: '송알바',
      email: 'song.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '생산팀',
      accessLevel: 'P2',
      isActive: true,
    },
    {
      id: 'USR019',
      name: '유알바',
      email: 'yoo.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '생산팀',
      accessLevel: 'P1',
      isActive: true,
    },
    {
      id: 'USR020',
      name: '전알바',
      email: 'jeon.parttime@aniecong.com',
      role: '알바',
      roleBg: 'bg-gray-100',
      roleText: 'text-gray-700',
      department: '경영지원팀',
      accessLevel: 'P2',
      isActive: true,
    },
  ];

  // 페이지네이션 계산
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
      {/* 헤더 */}
      <div className='border-b border-gray-200 p-4'>
        <div className='flex items-center space-x-2'>
          <Users className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>사용자 목록</h2>
        </div>
      </div>

      {/* 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                ID
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                사용자명
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                이메일
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                역할
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                부서
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                공장
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600'>
                작업
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentUsers.map((user) => (
              <tr key={user.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm text-gray-900'>{user.id}</td>
                <td className='px-4 py-3 text-sm text-gray-900'>{user.name}</td>
                <td className='px-4 py-3 text-sm text-gray-600'>
                  {user.email}
                </td>
                <td className='px-4 py-3'>
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs font-medium ${user.roleBg} ${user.roleText}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className='px-4 py-3 text-sm text-gray-900'>
                  {user.department}
                </td>
                <td className='px-4 py-3 text-sm text-gray-900'>
                  {user.accessLevel}
                </td>
                <td className='px-4 py-3'>
                  <div className='flex items-center space-x-2'>
                    <button className='text-red-600 hover:text-red-700'>
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className='px-4 pb-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserList;
