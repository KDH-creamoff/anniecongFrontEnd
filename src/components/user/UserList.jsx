import { Users, Trash2 } from 'lucide-react';

const UserList = () => {
  const users = [
    {
      id: 'USR001',
      name: '관리자',
      email: 'admin@aniecong.com',
      role: '관리자',
      roleBg: 'bg-purple-100',
      roleText: 'text-purple-700',
      department: '관리부',
      accessLevel: 'ALL',
      isActive: false,
    },
    {
      id: 'USR002',
      name: '김검수',
      email: 'kim.inspector@aniecong.com',
      role: '품질관리',
      roleBg: 'bg-orange-100',
      roleText: 'text-orange-700',
      department: '품질관리',
      accessLevel: 'P1',
      isActive: false,
    },
    {
      id: 'USR003',
      name: '이전처리',
      email: 'lee.processor@aniecong.com',
      role: '작업자',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '전처리',
      accessLevel: 'P1',
      isActive: false,
    },
    {
      id: 'USR004',
      name: '최제조',
      email: 'choi.manufacturer@aniecong.com',
      role: '작업자',
      roleBg: 'bg-green-100',
      roleText: 'text-green-700',
      department: '제조',
      accessLevel: 'P2',
      isActive: false,
    },
    {
      id: 'USR005',
      name: '박품질',
      email: 'park.quality@aniecong.com',
      role: '품질관리',
      roleBg: 'bg-orange-100',
      roleText: 'text-orange-700',
      department: '품질관리',
      accessLevel: 'P2',
      isActive: true,
    },
  ];

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
            {users.map((user) => (
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
                    <button className='text-red-600'>
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
