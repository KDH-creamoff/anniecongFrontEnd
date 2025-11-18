import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Settings } from 'lucide-react';
import { updatePermissions } from '../../store/modules/auth/actions';
import { fetchUsers } from '../../store/modules/user/actions';

const PermissionManagement = () => {
  const dispatch = useDispatch();
  const { users: userState } = useSelector((state) => state.user);

  useEffect(() => {
    // Redux를 통해 사용자 데이터 가져오기
    dispatch(fetchUsers.request());
  }, [dispatch]);

  const users = userState.data || [];

  // 필터 상태
  const [filterPosition, setFilterPosition] = useState('전체');
  const [filterDepartment, setFilterDepartment] = useState('전체');
  const [searchName, setSearchName] = useState('');

  // 필터링된 사용자 목록 (대표 제외)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // 대표는 목록에서 제외 (모든 권한이 자동으로 부여됨)
      if (user.position === '대표') return false;

      const matchDepartment = filterDepartment === '전체' || user.department === filterDepartment;
      const matchPosition = filterPosition === '전체' || user.position === filterPosition;
      const matchName = searchName === '' || user.name.toLowerCase().includes(searchName.toLowerCase());
      return matchPosition && matchDepartment && matchName;
    });
  }, [users, filterPosition, filterDepartment, searchName]);

  // 권한 토글 핸들러
  const handlePermissionToggle = (userId, permissionKey) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    // 대표는 권한 변경 불가
    if (user.position === '대표') {
      alert('대표의 권한은 변경할 수 없습니다.');
      return;
    }

    const updatedPermissions = {
      ...user.permissions,
      [permissionKey]: !user.permissions[permissionKey],
    };

    // Redux를 통해 권한 업데이트
    dispatch(updatePermissions.request({
      userId: userId,
      permissions: updatedPermissions,
    }));

    // 권한 업데이트 후 목록 다시 조회
    setTimeout(() => {
      dispatch(fetchUsers.request());
    }, 500);
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
  const renderUserPermissions = (user) => {
    // 권한이 없으면 기본값 설정
    const permissions = user.permissions || {
      dash: false,
      basic: false,
      receiving: false,
      manufacturing: false,
      inventory: false,
      shipping: false,
      approval: false,
      label: false,
      user: false,
    };

    return (
      <div key={user.id} className='space-y-4'>
        {/* 사용자 정보 헤더 */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-baseline space-x-2 mb-4'>
              <span className='text-xl font-medium text-[#674529]'>{user.name}</span>
              <span className='text-sm text-gray-600'>{user.department} • {user.position}</span>
              {user.position === '대표' && (
                <span className='text-xs bg-[#674529] text-white px-2 py-1 rounded'>모든 권한</span>
              )}
            </div>
          </div>

          {/* 권한 설정 그리드 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            {/* 왼쪽 컬럼 */}
            <div className='space-y-4'>
              <PermissionItem
                title='대시보드'
                isEnabled={permissions.dash}
                onToggle={() => handlePermissionToggle(user.id, 'dash')}
              />
              <PermissionItem
                title='기초정보 관리'
                isEnabled={permissions.basic}
                onToggle={() => handlePermissionToggle(user.id, 'basic')}
              />
              <PermissionItem
                title='입고 관리'
                isEnabled={permissions.receiving}
                onToggle={() => handlePermissionToggle(user.id, 'receiving')}
              />
              <PermissionItem
                title='제조 관리'
                isEnabled={permissions.manufacturing}
                onToggle={() => handlePermissionToggle(user.id, 'manufacturing')}
              />
              <PermissionItem
                title='재고 관리'
                isEnabled={permissions.inventory}
                onToggle={() => handlePermissionToggle(user.id, 'inventory')}
              />
            </div>

            {/* 오른쪽 컬럼 */}
            <div className='space-y-4'>
              <PermissionItem
                title='배송 관리'
                isEnabled={permissions.shipping}
                onToggle={() => handlePermissionToggle(user.id, 'shipping')}
              />
              <PermissionItem
                title='전자결재'
                isEnabled={permissions.approval}
                onToggle={() => handlePermissionToggle(user.id, 'approval')}
              />
              <PermissionItem
                title='라벨 관리'
                isEnabled={permissions.label}
                onToggle={() => handlePermissionToggle(user.id, 'label')}
              />
              <PermissionItem
                title='사용자 관리'
                isEnabled={permissions.user}
                onToggle={() => handlePermissionToggle(user.id, 'user')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

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
