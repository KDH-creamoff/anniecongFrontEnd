import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * 권한 기반 라우트 보호 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.permission - 필요한 권한 이름 (예: 'dash', 'basic', 'receiving')
 * @param {React.ReactNode} props.children - 보호할 컴포넌트
 * @param {string} props.redirectTo - 권한이 없을 때 리다이렉트할 경로 (기본: '/dash')
 */
const ProtectedRoute = ({ permission, children, redirectTo = '/dash' }) => {
  const { user } = useSelector((state) => state.auth);

  // 로그인하지 않은 경우
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 권한 체크가 필요하지 않은 경우 (permission이 없으면 모두 허용)
  if (!permission) {
    return children;
  }

  // 대표는 모든 권한 허용
  if (user.position === '대표') {
    return children;
  }

  // 권한이 없는 경우
  if (!user.permissions || !user.permissions[permission]) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f6f2' }}>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-[#674529] mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 페이지에 접근할 수 있는 권한이 없습니다.
            <br />
            관리자에게 문의하세요.
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
