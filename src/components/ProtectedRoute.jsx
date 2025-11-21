import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ permission, children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // 세션 확인 중일 때는 로딩 상태 표시 (앱 시작 시 getMe 호출 중)
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f6f2' }}>
        <div className="text-lg text-[#674529]">로딩중...</div>
      </div>
    );
  }

  // 로그인하지 않은 경우 (세션 확인 완료 후 user가 없으면)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 권한 체크가 필요하지 않은 경우 (permission이 없으면 모두 허용)
  if (!permission) {
    return children;
  }

  // permissions 객체가 없는 경우 - 접근 거부
  if (!user.permissions || typeof user.permissions !== 'object') {
    console.error('❌ ProtectedRoute: permissions 정보가 없습니다. 접근을 거부합니다.', {
      user: user.id,
      requiredPermission: permission,
      position: user.position,
      role: user.role,
      hasPermissions: !!user.permissions,
    });
    return (
      <div className="min-h-[80vh] my-auto flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f9f6f2' }}>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-[#674529] mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 페이지에 접근할 수 있는 권한 정보가 없습니다.
            <br />
            관리자에게 문의하여 권한을 부여받아주세요.
          </p>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-[#674529] text-white py-3 rounded-lg font-semibold hover:bg-[#543620] transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 권한이 없는 경우 - 접근 거부
  if (!user.permissions[permission]) {
    console.warn('❌ ProtectedRoute: 권한이 없습니다.', {
      user: user.id,
      requiredPermission: permission,
      userPermissions: user.permissions,
      position: user.position,
    });
    return (
      <div className="min-h-[80vh] my-auto flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f9f6f2' }}>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-[#674529] mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 페이지에 접근할 수 있는 권한이 없습니다.
            <br />
            관리자에게 문의하여 권한을 부여받아주세요.
          </p>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-[#674529] text-white py-3 rounded-lg font-semibold hover:bg-[#543620] transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 권한이 있는 경우
  return children;
};

export default ProtectedRoute;
