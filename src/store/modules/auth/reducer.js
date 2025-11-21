import { LOGIN, LOGOUT, SIGNUP, GET_ME, CHECK_AUTH, CLEAR_AUTH_ERROR, UPDATE_PERMISSIONS } from './actions';

const initialState = {
  isAuthenticated: false, // 로그인 여부
  user: null, // 사용자 정보
  token: null, // 세션 기반 인증 사용 (쿠키로 자동 관리)
  loading: false, // 로딩 상태
  error: null, // 에러 메시지
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==================== 로그인/회원가입 요청 시작 ====================
    case LOGIN.REQUEST:
    case SIGNUP.REQUEST:
      return { ...state, loading: true, error: null };

    // ==================== 로그인 성공 ====================
    case LOGIN.SUCCESS:
      // 세션 기반 인증: 쿠키로 자동 관리되므로 localStorage에 저장하지 않음

      return {
        ...state,
        isAuthenticated: true, // 로그인 상태로 변경
        user: action.payload.user, // 사용자 정보 저장
        token: action.payload.token || null, // 토큰은 응답에 있을 수 있지만 세션 기반이므로 필요 없음
        loading: false, // 로딩 종료
        error: null, // 에러 초기화
      };

    // ==================== 회원가입 성공 ====================
    case SIGNUP.SUCCESS:
      return { ...state, loading: false, error: null, signupSuccess: true };

    // ==================== 로그인/회원가입 실패 ====================
    case LOGIN.FAILURE:
    case SIGNUP.FAILURE:
      return { ...state, loading: false, error: action.error };

    // ==================== 사용자 정보 조회 ====================
    case GET_ME.REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ME.SUCCESS:
      return {
        ...state,
        isAuthenticated: true, // 세션 유효성 확인 성공 시 로그인 상태로 설정
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case GET_ME.FAILURE:
      return { ...state, loading: false, error: action.error };

    // ==================== 로그아웃 성공 ====================
    case LOGOUT.SUCCESS:
      // 세션 기반 인증: 쿠키는 백엔드에서 제거됨
      localStorage.removeItem('currentUser');
      localStorage.removeItem('users'); // 임시 데이터 정리
      return { ...initialState, token: null };

    // ==================== 인증 상태 확인 ====================
    case CHECK_AUTH:
      // 세션 기반 인증: Redux에 user 정보가 있으면 인증된 것으로 간주
      // 또는 GET /api/auth/me 호출로 세션 유효성 확인
      return { ...state, isAuthenticated: !!state.user };

    // ==================== 권한 업데이트 ====================
    case UPDATE_PERMISSIONS.REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_PERMISSIONS.SUCCESS:
      return { ...state, loading: false, error: null };

    case UPDATE_PERMISSIONS.FAILURE:
      return { ...state, loading: false, error: action.error };

    // ==================== 에러 메시지 초기화 ====================
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };

    // ==================== 기본 케이스 ====================
    default:
      return state;
  }
};

export default authReducer;
