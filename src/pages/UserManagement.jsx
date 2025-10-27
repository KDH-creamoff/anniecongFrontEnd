import { Users } from 'lucide-react';
import UserSummaryCards from '../components/user/UserSummaryCards';
import CreateUser from '../components/user/CreateUser';
import UserList from '../components/user/UserList';

const UserManagement = ({ subPage }) => {
  const renderContent = () => {
    switch (subPage) {
      case 'nav1': // 직원 관리
        return (
          <>
            <UserSummaryCards />
            <CreateUser />
            <UserList />
          </>
        );
      case 'nav2': // 권한 관리
        return (
          <>
            <div>권한 관리 페이지 (만드는 중...)</div>
          </>
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch (subPage) {
      case 'nav1':
        return '직원 관리';
      case 'nav2':
        return '권한 관리';
      default:
        return '사용자 관리';
    }
  };

  const getPageDescription = () => {
    switch (subPage) {
      case 'nav1':
        return 'RBAC 기반 접근제어, 사용자 등록 및 관리';
      case 'nav2':
        return '사용자 권한 설정 및 관리';
      default:
        return 'RBAC 기반 접근제어, 사용자 등록 및 권한 설정';
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
              {getPageTitle()}
            </h1>
          </div>
          <p className='text-sm text-gray-600'>{getPageDescription()}</p>
        </div>
      </div>

      {/* 컨텐츠 */}
      {renderContent()}
    </div>
  );
};

export default UserManagement;