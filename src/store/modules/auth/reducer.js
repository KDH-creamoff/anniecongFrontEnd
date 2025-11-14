import { LOGIN, LOGOUT, SIGNUP, CHECK_AUTH, CLEAR_AUTH_ERROR } from './actions';

const initialState = {
  isAuthenticated: false, // 로그인 여부
  user: null, // 사용자 정보
  token: localStorage.getItem('accessToken'), // 브라우저에 저장된 토큰 불러오기
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
      localStorage.setItem('accessToken', action.payload.token);

      return {
        ...state,
        isAuthenticated: true, // 로그인 상태로 변경
        user: action.payload.user, // 사용자 정보 저장
        token: action.payload.token, // 토큰 저장
        loading: false, // 로딩 종료
        error: null, // 에러 초기화
      };

    // ==================== 회원가입 성공 ====================
    case SIGNUP.SUCCESS:
      return { ...state, loading: false, error: null };

    // ==================== 로그인/회원가입 실패 ====================
    case LOGIN.FAILURE:
    case SIGNUP.FAILURE:
      return { ...state, loading: false, error: action.error };

    // ==================== 로그아웃 성공 ====================
    case LOGOUT.SUCCESS:
      localStorage.removeItem('accessToken');
      return { ...initialState, token: null };

    // ==================== 인증 상태 확인 ====================
    case CHECK_AUTH:
      const token = localStorage.getItem('accessToken');
      return { ...state, isAuthenticated: !!token, token };

    // ==================== 에러 메시지 초기화 ====================
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };

    // ==================== 기본 케이스 ====================
    default:
      return state;
  }
};

export default authReducer;
