import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Lock,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  LogOut,
  Save,
  X,
  CheckCircle,
  Signature,
  Upload,
  Edit,
  Trash2,
} from "lucide-react";
import { getMe, changePassword, changePosition, logout } from "../store/modules/auth/actions";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { user, loading, error } = useSelector((state) => state.auth);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [isEditingStamp, setIsEditingStamp] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [newPosition, setNewPosition] = useState("");
  const [stampImage, setStampImage] = useState(null);
  const [stampPreview, setStampPreview] = useState("");

  // 이메일 인증 관련 상태
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // 컴포넌트 마운트 시 사용자 정보 조회
  useEffect(() => {
    dispatch(getMe.request());
  }, [dispatch]);

  // 사용자 정보 로드 시 position 설정
  useEffect(() => {
    const userPosition = user?.position || user?.UserProfile?.position;
    if (userPosition) {
      setNewPosition(userPosition);
    }
  }, [user]);

  // 에러 처리 - 401 에러 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (error) {
      const errorString = String(error);
      // 401 에러 또는 인증 관련 에러인 경우
      if (errorString.includes("401") || errorString.includes("인증") || errorString.includes("Unauthorized") || errorString.includes("인증이")) {
        console.log('⚠️ Mypage: 401 에러 감지, 로그인 페이지로 리다이렉트', error);
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        // localStorage 초기화
        // 세션 기반 인증: 쿠키는 백엔드에서 제거됨
        localStorage.removeItem('currentUser');
        localStorage.removeItem('users'); // 임시 데이터 정리
        // 로그인 페이지로 강제 리다이렉트
        window.location.replace('/login');
        return;
      }
    }
  }, [error]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이메일 인증번호 전송
  const handleSendVerificationCode = async () => {
    if (!verificationEmail) return alert('이메일을 입력해주세요.');
    if (verificationEmail !== user?.email) return alert('등록된 이메일과 일치하지 않습니다.');

    setIsSendingCode(true);
    setVerificationMessage('인증번호 전송 중입니다...');

    // 백엔드 이메일 인증 API 연동 필요
    // const response = await authAPI.sendVerificationCode({ email: verificationEmail });
    
    // 임시 처리 (백엔드 API 준비 전까지)
    setTimeout(() => {
      setIsSendingCode(false);
      setIsCodeSent(true);
      setVerificationMessage('인증번호가 전송되었습니다. 이메일을 확인해주세요.');
    }, 1500);
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (!verificationCode) return alert('인증번호를 입력해주세요.');

    // 백엔드 이메일 인증 확인 API 연동 필요
    // const response = await authAPI.verifyCode({ email: verificationEmail, code: verificationCode });

    
    // 임시 처리 (백엔드 API 준비 전까지)
    if (verificationCode === '123456') {
      setIsVerified(true);
      setVerificationMessage('인증이 완료되었습니다.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const handlePasswordSubmit = () => {
    const { newPassword, confirmPassword } = passwordData;
    if (!isVerified) return alert("이메일 인증을 완료해주세요.");
    if (!newPassword || !confirmPassword) return alert("모든 필드를 입력해주세요.");
    if (newPassword !== confirmPassword) return alert("새 비밀번호가 일치하지 않습니다.");
    if (newPassword.length < 4) return alert("비밀번호는 최소 4자 이상이어야 합니다.");

    // Redux Saga를 통한 비밀번호 변경
    dispatch(changePassword.request({
      newPassword,
    }));

    // 성공 시 폼 초기화
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
    setVerificationEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
    setIsVerified(false);
    setVerificationMessage("");
    setIsEditingPassword(false);
    alert("비밀번호가 변경되었습니다.");
  };

  const handlePasswordCancel = () => {
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
    setVerificationEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
    setIsVerified(false);
    setVerificationMessage("");
    setIsEditingPassword(false);
  };

  const handlePositionSubmit = () => {
    if (newPosition === "대표") return alert("대표 직급으로 변경할 수 없습니다.");
    const currentPosition = user?.position || user?.UserProfile?.position;
    if (currentPosition === newPosition) {
      setIsEditingPosition(false);
      return;
    }

    // Redux Saga를 통한 직급 변경
    // API 명세: { userId, position }
    dispatch(changePosition.request({
      userId: user?.id,
      position: newPosition
    }));

    setIsEditingPosition(false);
    alert("직급이 변경되었습니다.");
  };

  const handlePositionCancel = () => {
    const currentPosition = user?.position || user?.UserProfile?.position || "";
    setNewPosition(currentPosition);
    setIsEditingPosition(false);
  };

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    // Redux Saga를 통한 로그아웃
    dispatch(logout.request());
    navigate("/login");
  };

  // 도장 이미지 업로드 핸들러
  const handleStampImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      setStampImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setStampPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 도장 이미지 제거
  const handleRemoveStampImage = () => {
    setStampImage(null);
    setStampPreview("");
  };

  // 도장 저장
  const handleStampSubmit = () => {
    // 백엔드 API 연동 필요
    // const formData = new FormData();
    // if (stampImage) formData.append('stamp', stampImage);
    // if (signatureImage) formData.append('signature', signatureImage);
    // await authAPI.updateStampAndSignature(user?.id, formData);
    
    alert('도장이 저장되었습니다.');
    setIsEditingStamp(false);
    // 저장 후 사용자 정보 다시 조회
    dispatch(getMe.request());
  };

  const handleStampCancel = () => {
    setStampImage(null);
    setStampPreview("");
    setSignatureImage(null);
    setSignaturePreview("");
    setIsEditingStamp(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f9f6f2" }}>
        <div className="text-lg text-[#674529]">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9f6f2" }}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <div className="mb-2 flex items-center space-x-2">
            <User className="h-6 w-6 text-[#674529]" />
            <h1 className="text-2xl font-bold text-[#674529]">마이페이지</h1>
          </div>
          <p className="text-sm text-gray-600">내 정보 조회 및 수정</p>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#674529]">기본 정보</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>아이디</span>
              </label>
              <input type="text" value={user?.id || user?.username || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>이름</span>
              </label>
              <input type="text" value={user?.name || user?.UserProfile?.full_name || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Briefcase className="h-4 w-4" />
                <span>부서</span>
              </label>
              <input type="text" value={user?.department || user?.UserProfile?.department || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4" />
                <span>연락처</span>
              </label>
              <input type="text" value={user?.phone || user?.UserProfile?.phone_number || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4" />
                <span>이메일</span>
              </label>
              <input type="email" value={user?.email || user?.UserProfile?.email || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4" />
                <span>입사일</span>
              </label>
              <input type="text" value={user?.joinDate || user?.UserProfile?.hire_date || ""} disabled className="w-full rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Briefcase className="h-4 w-4" />
                <span>직급</span>
              </label>
              <div className="flex items-center space-x-2">
                <input type="text" value={user?.position || user?.UserProfile?.position || ""} disabled className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" />
                {!isEditingPosition && (
                  <button onClick={() => setIsEditingPosition(true)} className="rounded bg-[#674529] px-3 py-2 text-sm text-white transition-colors hover:bg-[#543620]">
                    변경
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Signature className="h-4 w-4" />
                <span>도장</span>
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={user?.stampImage || user?.signatureImage ? "등록됨" : "미등록"} 
                  disabled 
                  className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm text-gray-900" 
                />
                {!isEditingStamp && (
                  <button onClick={() => setIsEditingStamp(true)} className="rounded bg-[#674529] px-3 py-2 text-sm text-white transition-colors hover:bg-[#543620]">
                    {user.signatureImage ? "변경" : "등록"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditingPosition && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#674529]">직급 변경</h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">새 직급 선택</label>
              <select
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className="w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
              >
                <option value="알바">알바</option>
                <option value="직원">직원</option>
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

        {isEditingStamp && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[#674529]">도장 수정</h2>
            <div className="space-y-6">
                {/* 도장 이미지 업로드 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">도장 이미지</label>
                  <div className="space-y-3">
                    {(stampPreview || user?.stampImage) && (
                      <div className="relative">
                        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50">
                          <img
                            src={stampPreview || user?.stampImage}
                            alt="도장 미리보기"
                            className="h-40 w-full object-contain p-4"
                          />
                        </div>
                        <button
                          onClick={handleRemoveStampImage}
                          className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-colors hover:bg-gray-100">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStampImageChange}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Upload className="h-5 w-5" />
                        <span>도장 이미지 {stampPreview || user?.stampImage ? '변경' : '업로드'}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleStampCancel}
                className="flex items-center space-x-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                <span>취소</span>
              </button>
              <button
                onClick={handleStampSubmit}
                className="flex items-center space-x-2 rounded bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#543620]"
              >
                <Save className="h-4 w-4" />
                <span>완료</span>
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#674529]">비밀번호 변경</h2>
            {!isEditingPassword && (
              <button onClick={() => setIsEditingPassword(true)} className="rounded bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#543620]">
                비밀번호 변경
              </button>
            )}
          </div>

          {isEditingPassword && (
            <>
              <div className="space-y-4">
                {/* 이메일 인증 섹션 */}
                <div>
                  <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4" />
                    <span>이메일 인증</span>
                    {isVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={verificationEmail}
                      onChange={(e) => setVerificationEmail(e.target.value)}
                      placeholder="이메일을 입력하세요"
                      disabled={isVerified}
                      className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529] disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendVerificationCode}
                      disabled={isSendingCode || isVerified}
                      className="whitespace-nowrap rounded bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#543620] disabled:opacity-50"
                    >
                      {isSendingCode ? "전송중..." : isCodeSent ? "재전송" : "인증하기"}
                    </button>
                  </div>
                  {verificationMessage && (
                    <p className={`mt-2 text-sm ${isVerified ? "text-green-600" : "text-[#674529]"}`}>
                      {verificationMessage}
                    </p>
                  )}
                </div>

                {/* 인증번호 입력 (인증번호 전송 후 표시) */}
                {isCodeSent && !isVerified && (
                  <div>
                    <label className="mb-2 flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Lock className="h-4 w-4" />
                      <span>인증번호</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증번호를 입력하세요"
                        className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]"
                      />
                      <button
                        onClick={handleVerifyCode}
                        className="whitespace-nowrap rounded bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#543620]"
                      >
                        인증완료
                      </button>
                    </div>
                  </div>
                )}

                {/* 새 비밀번호 입력 (인증 완료 후 표시) */}
                {isVerified && (
                  <>
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
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handlePasswordCancel}
                  className="flex items-center space-x-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  <span>취소</span>
                </button>
                {isVerified && (
                  <button
                    onClick={handlePasswordSubmit}
                    className="flex items-center space-x-2 rounded bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#543620]"
                  >
                    <Save className="h-4 w-4" />
                    <span>저장</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>

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
