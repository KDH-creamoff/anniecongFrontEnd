import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { roleAPI } from '../../api';

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({}); // { roleId: true/false }

  // 역할 목록 가져오기
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await roleAPI.getAllRoles();
        const rolesData = response.data?.data || response.data || [];
        setRoles(Array.isArray(rolesData) ? rolesData : []);
      } catch (error) {
        console.error('역할 목록 조회 실패:', error);
        alert('역할 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // 권한 토글 핸들러
  const handlePermissionToggle = async (roleId, permissionKey) => {
    // 업데이트 중이면 무시
    if (updating[roleId]) {
      return;
    }

    // 현재 역할 찾기
    const role = roles.find((r) => r.id === roleId);
    if (!role) {
      console.error('역할을 찾을 수 없습니다:', roleId);
      return;
    }

    // 현재 권한 상태 복사
    const currentPermissions = {
      can_basic_info: role.can_basic_info || false,
      can_receiving: role.can_receiving || false,
      can_plant1_preprocess: role.can_plant1_preprocess || false,
      can_plant_transfer: role.can_plant_transfer || false,
      can_plant2_manufacture: role.can_plant2_manufacture || false,
      can_shipping: role.can_shipping || false,
      can_label: role.can_label || false,
      can_inventory: role.can_inventory || false,
      can_quality: role.can_quality || false,
      can_user_management: role.can_user_management || false,
    };

    // 토글할 권한 업데이트
    const updatedPermissions = {
      ...currentPermissions,
      [permissionKey]: !currentPermissions[permissionKey],
    };

    console.log('🔄 권한 업데이트:', {
      roleId,
      roleName: role.display_name || role.name,
      permissionKey,
      oldValue: currentPermissions[permissionKey],
      newValue: updatedPermissions[permissionKey],
      allPermissions: updatedPermissions,
    });

    try {
      setUpdating((prev) => ({ ...prev, [roleId]: true }));

      // API 호출: PUT /api/roles/:id/permissions
      const response = await roleAPI.updatePermissions(roleId, updatedPermissions);
      console.log('✅ 권한 업데이트 성공:', response.data);

      // 로컬 상태 업데이트
      setRoles((prevRoles) =>
        prevRoles.map((r) =>
          r.id === roleId
            ? {
                ...r,
                ...updatedPermissions,
              }
            : r
        )
      );
    } catch (error) {
      console.error('❌ 권한 업데이트 실패:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        '권한 업데이트에 실패했습니다.';
      alert(`권한 업데이트 실패: ${errorMessage}`);
    } finally {
      setUpdating((prev) => ({ ...prev, [roleId]: false }));
    }
  };

  // 권한 항목 컴포넌트
  const PermissionItem = ({ title, isEnabled, onToggle, disabled }) => (
    <div className='flex items-center justify-between py-4 px-6 bg-gray-50 rounded-lg'>
      <div>
        <div className='font-medium text-gray-900'>{title}</div>
      </div>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#674529] focus:ring-offset-2 ${
          isEnabled ? 'bg-[#674529]' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  // 역할별 권한 섹션 렌더링
  const renderRolePermissions = (role) => {
    const isUpdating = updating[role.id] || false;

    // 권한 매핑 (백엔드 필드명 → 프론트엔드 표시명)
    const permissionMap = [
      { key: 'can_basic_info', title: '기초정보 관리' },
      { key: 'can_receiving', title: '입고 관리' },
      { key: 'can_plant1_preprocess', title: '공장1 전처리' },
      { key: 'can_plant_transfer', title: '공장 이송' },
      { key: 'can_plant2_manufacture', title: '공장2 제조' },
      { key: 'can_shipping', title: '배송 관리' },
      { key: 'can_label', title: '라벨 관리' },
      { key: 'can_inventory', title: '재고 관리' },
      { key: 'can_quality', title: '품질 관리' },
      { key: 'can_user_management', title: '사용자 관리' },
    ];

    return (
      <div key={role.id} className='space-y-4'>
        {/* 역할 정보 헤더 */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-baseline space-x-3'>
              <span className='text-xl font-medium text-[#674529]'>
                {role.display_name || role.name}
              </span>
              {role.description && (
                <span className='text-sm text-gray-600'>{role.description}</span>
              )}
              {role.is_system && (
                <span className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded'>
                  시스템 역할
                </span>
              )}
              {role.is_default && (
                <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                  기본 역할
                </span>
              )}
            </div>
            {isUpdating && (
              <span className='text-sm text-gray-500'>업데이트 중...</span>
            )}
          </div>

          {/* 권한 설정 그리드 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* 왼쪽 컬럼 */}
            <div className='space-y-4'>
              {permissionMap.slice(0, 5).map((perm) => (
                <PermissionItem
                  key={perm.key}
                  title={perm.title}
                  isEnabled={role[perm.key] || false}
                  onToggle={() => handlePermissionToggle(role.id, perm.key)}
                  disabled={isUpdating}
                />
              ))}
            </div>

            {/* 오른쪽 컬럼 */}
            <div className='space-y-4'>
              {permissionMap.slice(5).map((perm) => (
                <PermissionItem
                  key={perm.key}
                  title={perm.title}
                  isEnabled={role[perm.key] || false}
                  onToggle={() => handlePermissionToggle(role.id, perm.key)}
                  disabled={isUpdating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-gray-500'>역할 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 페이지 헤더 */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex items-center space-x-2'>
          <Settings className='h-5 w-5 text-[#674529]' />
          <h2 className='text-lg text-[#674529]'>역할별 권한 설정</h2>
        </div>
      </div>

      {/* 역할별 권한 섹션 */}
      {roles.length === 0 ? (
        <div className='bg-white rounded-xl shadow-sm p-6 text-center text-gray-500'>
          역할이 없습니다.
        </div>
      ) : (
        roles.map((role) => renderRolePermissions(role))
      )}
    </div>
  );
};

export default PermissionManagement;
