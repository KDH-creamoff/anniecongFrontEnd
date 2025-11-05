import { LOGIN, LOGOUT, SIGNUP, CHECK_AUTH, CLEAR_AUTH_ERROR } from './actions';

/**
 * ==================== 초기 상태 ====================
 *
 * 왜 이런 구조인가요?
 * - isAuthenticated: 사용자가 로그인했는지 여부 (true/false)
 * - user: 로그인한 사용자 정보 (이름, 이메일 등)
 * - token: JWT 토큰 (API 요청 시 필요)
 * - loading: API 요청 중인지 여부 (로딩 표시에 사용)
 * - error: 에러 메시지 (로그인 실패 시 사용자에게 보여줌)
 */
const initialState = {
  isAuthenticated: false, // 로그인 여부
  user: null, // 사용자 정보
  token: localStorage.getItem('accessToken'), // 브라우저에 저장된 토큰 불러오기
  loading: false, // 로딩 상태
  error: null, // 에러 메시지
};

/**
 * ==================== Auth Reducer ====================
 *
 * Reducer의 역할:
 * 1. 액션을 받아서 상태를 업데이트
 * 2. 항상 새로운 객체를 반환 (불변성 유지)
 * 3. switch문으로 액션 타입별로 처리
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==================== 로그인/회원가입 요청 시작 ====================
    case LOGIN.REQUEST:
    case SIGNUP.REQUEST:
      // 왜 이렇게 하나요?
      // - API 호출 시작: loading을 true로 변경
      // - 이전 에러 메시지 초기화
      return { ...state, loading: true, error: null };

    // ==================== 로그인 성공 ====================
    case LOGIN.SUCCESS:
      // 왜 localStorage에 토큰을 저장하나요?
      // - 브라우저를 새로고침해도 로그인 상태 유지
      // - 다음에 API 요청할 때 자동으로 토큰 사용
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
      // 왜 회원가입은 로그인과 다르게 처리하나요?
      // - 회원가입 성공 후 자동 로그인을 할지, 로그인 페이지로 이동할지는 프로젝트마다 다름
      // - 여기서는 회원가입만 성공 처리하고, 별도로 로그인하도록 설정
      return { ...state, loading: false, error: null };

    // ==================== 로그인/회원가입 실패 ====================
    case LOGIN.FAILURE:
    case SIGNUP.FAILURE:
      // 왜 이렇게 하나요?
      // - loading을 false로 변경 (로딩 중단)
      // - error에 에러 메시지 저장 (화면에 표시)
      return { ...state, loading: false, error: action.error };

    // ==================== 로그아웃 성공 ====================
    case LOGOUT.SUCCESS:
      // 왜 localStorage에서 토큰을 삭제하나요?
      // - 로그아웃 시 토큰을 제거해야 다음 로그인 시 문제가 없음
      localStorage.removeItem('accessToken');

      // 왜 initialState를 사용하나요?
      // - 모든 상태를 초기값으로 되돌림
      // - 단, token만 명시적으로 null로 설정
      return { ...initialState, token: null };

    // ==================== 인증 상태 확인 ====================
    case CHECK_AUTH:
      // 왜 이 액션이 필요한가요?
      // - 앱 시작 시 localStorage에 토큰이 있는지 확인
      // - 있으면 자동 로그인 상태로 만듦
      const token = localStorage.getItem('accessToken');
      return { ...state, isAuthenticated: !!token, token };

    // ==================== 에러 메시지 초기화 ====================
    case CLEAR_AUTH_ERROR:
      // 왜 필요한가요?
      // - 에러 메시지를 사용자가 닫거나 다른 페이지로 이동할 때 초기화
      return { ...state, error: null };

    // ==================== 기본 케이스 ====================
    default:
      // 왜 state를 그대로 반환하나요?
      // - 이 리듀서가 처리하지 않는 액션은 무시
      return state;
  }
};

export default authReducer;
