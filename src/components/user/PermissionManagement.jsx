import { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';

const PermissionManagement = () => {
  // 사용자 목록 및 권한 상태
  const [users, setUsers] = useState([
    {
      id: 1,
      name: '김직원',
      position: '직원',
      department: '생산',
      role: '생산 • 직원',
      permissions: {
        기초정보관리: false,
        재고관리: false,
        입출고관리: false,
        제조관리: false,
        배송관리: false,
        전자결재: false,
        라벨관리: false,
        재고조회: false,
        풀질검사: false,
        사용자관리: false,
      },
    },
    {
      id: 2,
      name: '이팀장',
      position: '팀장',
      department: '경영지원',
      role: '경연지원 • 팀장',
      permissions: {
        기초정보관리: false,
        재고관리: false,
        입출고관리: false,
        제조관리: false,
        배송관리: false,
        전자결재: false,
        라벨관리: false,
        재고조회: false,
        풀질검사: false,
        사용자관리: false,
      },
    },
    {
      id: 3,
      name: '박이사',
      position: '이사',
      department: '생산',
      role: '생산 • 이사',
      permissions: {
        기초정보관리: false,
        재고관리: false,
        입출고관리: false,
        제조관리: false,
        배송관리: false,
        전자결재: false,
        라벨관리: false,
        재고조회: false,
        풀질검사: false,
        사용자관리: false,
      },
    },
    {
      id: 4,
      name: '최알바',
      position: '알바',
      department: '경영지원',
      role: '경영지원 • 알바',
      permissions: {
        기초정보관리: false,
        재고관리: false,
        입출고관리: false,
        제조관리: false,
        배송관리: false,
        전자결재: false,
        라벨관리: false,
        재고조회: false,
        풀질검사: false,
        사용자관리: false,
      },
    },
  ]);

  // 필터 상태
  const [filterPosition, setFilterPosition] = useState('전체');
  const [filterDepartment, setFilterDepartment] = useState('전체');
  const [searchName, setSearchName] = useState('');

  // 필터링된 사용자 목록
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchPosition = filterPosition === '전체' || user.position === filterPosition;
      const matchDepartment = filterDepartment === '전체' || user.department === filterDepartment;
      const matchName = searchName === '' || user.name.toLowerCase().includes(searchName.toLowerCase());
      return matchPosition && matchDepartment && matchName;
    });
  }, [users, filterPosition, filterDepartment, searchName]);

  // 권한 토글 핸들러
  const handlePermissionToggle = (userId, permissionName) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [permissionName]: !user.permissions[permissionName],
              },
            }
          : user
      )
    );
  };

  // 권한 항목 컴포넌트
  const PermissionItem = ({ title, isEnabled, onToggle }) => (
    <div className='flex items-center justify-between py-4 px-6 bg-gray-50 rounded-lg'>
      <div>
        <div className='font-medium text-gray-900'>{title}</div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#674529] focus:ring-offset-2 ${
          isEnabled ? 'bg-[#674529]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  // 사용자별 권한 섹션 렌더링
  const renderUserPermissions = (user) => (
    <div key={user.id} className='space-y-4'>
      {/* 사용자 정보 헤더 */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-baseline space-x-2 mb-4'>
            <span className='text-xl font-medium text-[#674529]'>{user.name}</span>
            <span className='text-sm text-gray-600'>{user.role}</span>
          </div>
        </div>

        {/* 권한 설정 그리드 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {/* 왼쪽 컬럼 */}
          <div className='space-y-4'>
            <PermissionItem
              title='기초정보 관리'
              isEnabled={user.permissions['기초정보관리']}
              onToggle={() => handlePermissionToggle(user.id, '기초정보관리')}
            />
            <PermissionItem
              title='1공장 전처리'
              isEnabled={user.permissions['입출고관리']}
              onToggle={() => handlePermissionToggle(user.id, '입출고관리')}
            />
            <PermissionItem
              title='2공장 제조'
              isEnabled={user.permissions['배송관리']}
              onToggle={() => handlePermissionToggle(user.id, '배송관리')}
            />
            <PermissionItem
              title='라벨관리'
              isEnabled={user.permissions['라벨관리']}
              onToggle={() => handlePermissionToggle(user.id, '라벨관리')}
            />
            <PermissionItem
              title='배송관리'
              isEnabled={user.permissions['배송관리']}
              onToggle={() => handlePermissionToggle(user.id, '배송관리')}
            />
          </div>

          {/* 오른쪽 컬럼 */}
          <div className='space-y-4'>
            <PermissionItem
              title='입고'
              isEnabled={user.permissions['재고관리']}
              onToggle={() => handlePermissionToggle(user.id, '재고관리')}
            />
            <PermissionItem
              title='공장간 이동'
              isEnabled={user.permissions['제조관리']}
              onToggle={() => handlePermissionToggle(user.id, '제조관리')}
            />
            <PermissionItem
              title='전자결재'
              isEnabled={user.permissions['전자결재']}
              onToggle={() => handlePermissionToggle(user.id, '전자결재')}
            />
            <PermissionItem
              title='재고조회'
              isEnabled={user.permissions['재고조회']}
              onToggle={() => handlePermissionToggle(user.id, '재고조회')}
            />
            <PermissionItem
              title='사용자관리'
              isEnabled={user.permissions['사용자관리']}
              onToggle={() => handlePermissionToggle(user.id, '사용자관리')}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='space-y-6'>
      {/* 페이지 헤더 및 필터 */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Settings className='h-5 w-5 text-[#674529]' />
            <h2 className='text-lg text-[#674529]'>
              사용자별 권한 설정
            </h2>
          </div>

          {/* 필터 선택 */}
          <div className='flex items-center space-x-3'>
            <input
              type='text'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder='사용자 이름 검색'
              className='px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#674529] focus:border-transparent'
            />

            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#674529] focus:border-transparent'
            >
              <option value='전체'>전체 직급</option>
              <option value='이사'>이사</option>
              <option value='팀장'>팀장</option>
              <option value='직원'>직원</option>
              <option value='알바'>알바</option>
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#674529] focus:border-transparent'
            >
              <option value='전체'>전체 부서</option>
              <option value='생산'>생산</option>
              <option value='경영지원'>경영지원</option>
            </select>
          </div>
        </div>
      </div>

      {/* 사용자별 권한 섹션 */}
      {filteredUsers.map((user) => renderUserPermissions(user))}
    </div>
  );
};

export default PermissionManagement;
