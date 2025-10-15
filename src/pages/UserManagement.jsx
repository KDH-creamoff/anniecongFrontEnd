import { useState } from 'react';
import { Users } from 'lucide-react';
import UserManagementTabSelector from '../components/user/UserManagementTabSelector';
import UserSummaryCards from '../components/user/UserSummaryCards';
import CreateUser from '../components/user/CreateUser';
import UserList from '../components/user/UserList';
import AccessLogList from '../components/user/AccessLogList';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <>
            <UserSummaryCards />
            <CreateUser />
            <UserList />
          </>
        );
      case 'roles':
        return (
          <>
            <div>만드는 중.</div>
          </>
        );
      case 'permissions':
        return (
          <>
            <div>만드는 중..</div>
          </>
        );
      case 'access-log':
        return (
          <>
            <AccessLogList />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <div className='mb-1 flex items-center space-x-2'>
            <Users className='h-5 w-5 text-[#674529]' />
            <h1 className='text-lg font-semibold text-[#674529]'>
              사용자/권한 관리
            </h1>
          </div>
          <p className='text-sm text-gray-600'>
            RBAC 기반 접근제어, 사용자 등록 및 권한 설정
          </p>
        </div>
      </div>

      {/* 탭 선택 */}
      <UserManagementTabSelector
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 컨텐츠 */}
      {renderContent()}
    </div>
  );
};

export default UserManagement;
