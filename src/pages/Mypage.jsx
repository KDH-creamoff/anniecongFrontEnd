import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Calendar, Briefcase, LogOut, Save, X } from 'lucide-react';

const Mypage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    phone: '',
    email: '',
    joinDate: '',
    position: '',
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [newPosition, setNewPosition] = useState('');

  // 사용자 정보 로드
  useEffect(() => {
    const user = "김직원";
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }

    // const parsedUser = JSON.parse(user);
    const parsedUser = '';
    // 실제로는 서버에서 전체 사용자 정보를 가져와야 함
    setUserData({
      userId: parsedUser.userId || 'id',
      name: parsedUser.name || '김알바',
      phone: parsedUser.phone || '010-1234-5678',
      email: parsedUser.email || 'user@aniecong.com',
      joinDate: parsedUser.joinDate || '2024-01-01',
      position: parsedUser.position || '사원',
    });
    setNewPosition(parsedUser.position || '사원');
  }, [navigate]);

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 비밀번호 변경 제출
  const handlePasswordSubmit = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordData.newPassword.length < 4) {
      alert('비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }

    // 실제로는 서버에 비밀번호 변경 요청을 보내야 함
    console.log('비밀번호 변경:', passwordData);
    alert('비밀번호가 변경되었습니다.');

    // 초기화
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditingPassword(false);
  };

  // 비밀번호 변경 취소
  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditingPassword(false);
  };

  // 직급 변경 제출
  const handlePositionSubmit = () => {
    if (newPosition === '대표') {
      alert('대표 직급으로 변경할 수 없습니다.');
      return;
    }

    // 실제로는 서버에 직급 변경 요청을 보내야 함
    console.log('직급 변경:', newPosition);

    setUserData((prev) => ({
      ...prev,
      position: newPosition,
    }));

    // localStorage 업데이트
    const user = JSON.parse(localStorage.getItem('user'));
    user.position = newPosition;
    localStorage.setItem('user', JSON.stringify(user));

    alert('직급이 변경되었습니다.');
    setIsEditingPosition(false);
  };

  // 직급 변경 취소
  const handlePositionCancel = () => {
    setNewPosition(userData.position);
    setIsEditingPosition(false);
  };

  // 로그아웃
  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9f6f2' }}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <div className="mb-2 flex items-center space-x-2">
            <User className="h-6 w-6 text-[#674529]" />
            <h1 className="text-2xl font-bold text-[#674529]">마이페이지</h1>
          </div>
          <p className="text-sm text-gray-600">내 정보 조회 및 수정</p>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#674529]">기본 정보</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 아이디 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>아이디</span>
              </label>
              <input
                type="text"
                value={userData.userId}
                disabled
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
              />
            </div>

            {/* 이름 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>이름</span>
              </label>
              <input
                type="text"
                value={userData.name}
                disabled
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4" />
                <span>연락처</span>
              </label>
              <input
                type="text"
                value={userData.phone}
                disabled
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4" />
                <span>이메일</span>
              </label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
              />
            </div>

            {/* 입사일 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4" />
                <span>입사일</span>
              </label>
              <input
                type="text"
                value={userData.joinDate}
                disabled
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
              />
            </div>

            {/* 직급 */}
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Briefcase className="h-4 w-4" />
                <span>직급</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userData.position}
                  disabled
                  className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm text-gray-900"
                />
                {!isEditingPosition && (
                  <button
                    onClick={() => setIsEditingPosition(true)}
                    className="rounded bg-[#674529] px-3 py-2 text-sm text-white transition-colors hover:bg-[#543620]"
                  >
                    변경
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 직급 변경 섹션 */}
        {isEditingPosition && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#674529]">직급 변경</h2>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                새 직급 선택
              </label>
              <select
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
              >
                <option value="알바">알바</option>
                <option value="직원">직원</option>
                <option value="경영지원팀">경영지원팀</option>
                <option value="생산팀">생산팀</option>
                <option value="팀장">팀장</option>
                <option value="이사">이사</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handlePositionCancel}
                className="flex items-center space-x-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                <span>취소</span>
              </button>
              <button
                onClick={handlePositionSubmit}
                className="flex items-center space-x-2 rounded bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#543620]"
              >
                <Save className="h-4 w-4" />
                <span>저장</span>
              </button>
            </div>
          </div>
        )}

        {/* 비밀번호 변경 섹션 */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#674529]">비밀번호 변경</h2>
            {!isEditingPassword && (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="rounded bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#543620]"
              >
                비밀번호 변경
              </button>
            )}
          </div>

          {isEditingPassword && (
            <>
              <div className="space-y-4">
                {/* 기존 비밀번호 */}
                <div>
                  <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Lock className="h-4 w-4" />
                    <span>기존 비밀번호</span>
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="기존 비밀번호를 입력하세요"
                    className="w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
                  />
                </div>

                {/* 새 비밀번호 */}
                <div>
                  <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Lock className="h-4 w-4" />
                    <span>새 비밀번호</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="새 비밀번호를 입력하세요"
                    className="w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
                  />
                </div>

                {/* 비밀번호 확인 */}
                <div>
                  <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Lock className="h-4 w-4" />
                    <span>비밀번호 확인</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="새 비밀번호를 다시 입력하세요"
                    className="w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handlePasswordCancel}
                  className="flex items-center space-x-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  <span>취소</span>
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex items-center space-x-2 rounded bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#543620]"
                >
                  <Save className="h-4 w-4" />
                  <span>저장</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* 로그아웃 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 rounded bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
