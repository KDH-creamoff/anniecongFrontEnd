import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, User, Lock } from 'lucide-react';
import { login } from '../store/modules/auth/actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    remember: false
  });

  // 임시 자동 로그인 (로컬 Mock 사용)
  useEffect(() => {
    if (!user && !loading) {
      // 로컬 스토리지에서 직접 사용자 정보 가져와서 Redux에 저장
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const mockUser = users.find(u => u.email === 'admin@kitae.com');
      
      if (mockUser) {
        const { password, ...userWithoutPassword } = mockUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        dispatch(login.success({ user: userWithoutPassword }));
      }
    }
  }, [dispatch, user, loading]);

  // 로그인 성공 시 대시보드로 이동
  useEffect(() => {
    if (user) {
      navigate('/dash');
    }
  }, [user, navigate]);

  // 에러 발생 시 알림
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 체크
    if (!formData.userId || !formData.password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // Redux Saga를 통한 로그인 처리
    // 백엔드 API는 username을 받음
    dispatch(login.request({
      userId: formData.userId, // username으로 변환됨
      username: formData.userId, // 백엔드 API 형식
      password: formData.password,
      remember: formData.remember
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9f6f2' }}>
      <div className="w-full max-w-md">
        {/* 로고/헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-28 h-16 rounded-xl flex items-center justify-center">
              <img src="/logo-nobg.png" alt="logo-nobg" className='flex w-full object-cover' />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#674529]">애니콩 펫베이커리</h1>
          <p className="text-gray-600 mt-2">재고관리 시스템</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-2 mb-6">
            <LogIn className="w-6 h-6 text-[#674529]" />
            <h2 className="text-2xl font-bold text-[#674529]">로그인</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 아이디 입력 */}
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-[#674529] mb-2">
                아이디
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#674529] focus:border-transparent outline-none transition-all"
                  placeholder="아이디를 입력하세요"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#674529] mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#674529] focus:border-transparent outline-none transition-all"
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#724323] text-white py-3 rounded-xl font-semibold hover:bg-[#5a3419] transition-colors duration-200 mt-6 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{' '}
              <Link
                to="/signup"
                className="text-[#724323] font-semibold hover:text-[#5a3419] transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
