import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Trash2 } from 'lucide-react';
import Pagination from '../common/Pagination';
import { fetchUsers, deleteUser } from '../../store/modules/user/actions';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 컴포넌트 마운트 시 사용자 목록 조회
  useEffect(() => {
    dispatch(fetchUsers.request());
  }, [dispatch]);

  // 직급별 스타일 반환
  const getRoleStyle = (position) => {
    switch (position) {
      case '대표':
        return { bg: 'bg-purple-100', text: 'text-purple-700' };
      case '이사':
        return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case '팀장':
      case '경영지원팀':
      case '생산팀':
        return { bg: 'bg-indigo-100', text: 'text-indigo-700' };
      case '직원':
        return { bg: 'bg-green-100', text: 'text-green-700' };
      case '알바':
        return { bg: 'bg-gray-100', text: 'text-gray-700' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  // 사용자 삭제 핸들러
  const handleDelete = (userId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    dispatch(deleteUser.request(userId));
  };

  // Redux에서 가져온 사용자 데이터 사용, 없으면 빈 배열 사용
  const displayUsers = users.data && users.data.length > 0 ? users.data : [];

  // 페이지네이션 계산
  const totalPages = Math.ceil(displayUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = displayUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 로딩 상태 처리
  if (users.loading) {
    return (
      <div className='rounded-xl border border-gray-200 bg-white p-8 shadow-sm'>
        <div className='text-center text-gray-600'>로딩 중...</div>
      </div>
    );
  }

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
                작업
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentUsers.map((user) => {
              const roleStyle = getRoleStyle(user.position || user.role);
              return (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-3 text-sm text-gray-900'>{user.id}</td>
                  <td className='px-4 py-3 text-sm text-gray-900'>{user.name}</td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {user.email}
                  </td>
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${roleStyle.bg} ${roleStyle.text}`}
                    >
                      {user.position || user.role}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-900'>
                    {user.department}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center space-x-2'>
                      {(user.position !== '대표' && user.role !== '대표') && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className='text-red-600 hover:text-red-700'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
