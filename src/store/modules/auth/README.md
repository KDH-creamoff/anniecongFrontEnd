# 🔐 Auth 모듈 상세 설명

## 📁 파일 구조

```
auth/
├── actions.js    - 액션 타입 & 액션 생성자
├── reducer.js    - 상태 관리 (로그인/로그아웃 상태)
├── sagas.js      - 비동기 API 호출 (로그인/로그아웃/회원가입)
└── selectors.js  - 상태 조회 함수
```

---

## 🔄 전체 흐름

### 1️⃣ 로그인 플로우

```
사용자가 로그인 버튼 클릭
    ↓
컴포넌트: dispatch(login.request({ email, password }))
    ↓
Saga: LOGIN.REQUEST 감지 → loginSaga 실행
    ↓
Saga: API 호출 (authAPI.login)
    ↓
성공 시: login.success({ user, token }) 디스패치
    ↓
Reducer: LOGIN.SUCCESS 처리
    - localStorage에 토큰 저장
    - isAuthenticated = true
    - user 정보 저장
    ↓
컴포넌트: useSelector로 상태 확인 → 로그인 완료!
```

### 2️⃣ 로그아웃 플로우

```
사용자가 로그아웃 버튼 클릭
    ↓
컴포넌트: dispatch(logout.request())
    ↓
Saga: LOGOUT.REQUEST 감지 → logoutSaga 실행
    ↓
Saga: API 호출 (authAPI.logout)
    ↓
Reducer: LOGOUT.SUCCESS 처리
    - localStorage에서 토큰 삭제
    - 모든 상태 초기화
    ↓
컴포넌트: 로그인 페이지로 리다이렉트
```

---

## 📝 각 파일 역할

### 1. actions.js - 액션 정의

**역할:** 어떤 행동을 할지 정의

```javascript
// 로그인 액션 생성
export const login = createAsyncActions(LOGIN);

// 사용 예시
dispatch(login.request({ email: 'test@test.com', password: '1234' }));
dispatch(login.success({ user, token }));
dispatch(login.failure('로그인 실패'));
```

**왜 3가지(REQUEST, SUCCESS, FAILURE)가 필요한가?**
- REQUEST: API 호출 시작 → 로딩 표시
- SUCCESS: API 호출 성공 → 데이터 저장
- FAILURE: API 호출 실패 → 에러 메시지 표시

---

### 2. reducer.js - 상태 관리

**역할:** 액션에 따라 상태를 업데이트

```javascript
// 초기 상태
{
  isAuthenticated: false,  // 로그인 여부
  user: null,              // 사용자 정보
  token: null,             // JWT 토큰
  loading: false,          // 로딩 상태
  error: null              // 에러 메시지
}
```

**주요 처리:**
1. `LOGIN.REQUEST` → loading = true
2. `LOGIN.SUCCESS` → 토큰 저장, isAuthenticated = true
3. `LOGIN.FAILURE` → error 메시지 저장
4. `LOGOUT.SUCCESS` → 모든 상태 초기화

---

### 3. sagas.js - 비동기 처리

**역할:** API 호출 같은 비동기 작업 처리

```javascript
function* loginSaga(action) {
  try {
    const response = yield call(authAPI.login, action.payload);
    yield put(login.success(response.data));
  } catch (error) {
    yield put(login.failure(error.message));
  }
}
```

**핵심 개념:**
- `yield call()`: API 호출하고 결과 기다림
- `yield put()`: 다른 액션 디스패치
- `takeLatest()`: 중복 요청 방지 (마지막 요청만 처리)

---

### 4. selectors.js - 상태 조회

**역할:** 컴포넌트에서 상태를 쉽게 가져오기

```javascript
// 컴포넌트에서 사용
const isAuthenticated = useSelector(selectIsAuthenticated);
const user = useSelector(selectCurrentUser);
const loading = useSelector(selectAuthLoading);
```

---

## 💻 컴포넌트에서 사용하기

### 로그인 컴포넌트 예시

```jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/modules/auth/actions';
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated
} from '../store/modules/auth/selectors';

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 액션 디스패치
    dispatch(login.request(form));
  };

  // 로그인 성공 시 리다이렉트
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

---

## 🔑 핵심 개념 정리

### 1. 왜 localStorage에 토큰을 저장하나요?

```javascript
// reducer.js의 LOGIN.SUCCESS 처리
localStorage.setItem('accessToken', action.payload.token);
```

**이유:**
- 브라우저 새로고침해도 로그인 상태 유지
- API 요청 시 자동으로 토큰 헤더에 추가 ([src/api/index.js](../../api/index.js) 참고)

### 2. 왜 Generator 함수(function*)를 사용하나요?

```javascript
function* loginSaga(action) {
  yield call(authAPI.login, action.payload);
}
```

**이유:**
- Redux Saga가 Generator를 사용
- 비동기 코드를 동기처럼 작성 가능
- 테스트하기 쉬움
- 취소, 재시도 등 고급 기능 사용 가능

### 3. 왜 takeLatest를 사용하나요?

```javascript
yield takeLatest(LOGIN.REQUEST, loginSaga);
```

**이유:**
- 로그인 버튼을 여러 번 클릭해도 마지막 요청만 처리
- 중복 요청 방지
- **takeEvery**는 모든 요청을 처리 (파일 업로드 등에 사용)

---

## 🛠️ 커스터마이징

### 자동 로그인 추가

```javascript
// App.jsx에서
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/modules/auth/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 앱 시작 시 토큰 확인
    dispatch(checkAuth());
  }, []);

  return <Routes>...</Routes>;
}
```

### 로그인 성공 후 알림 추가

```javascript
// sagas.js의 loginSaga에서
function* loginSaga(action) {
  try {
    const response = yield call(authAPI.login, action.payload);
    yield put(login.success(response.data));

    // 성공 알림 표시
    toast.success('로그인 성공!');
  } catch (error) {
    yield put(login.failure(error.message));
    toast.error('로그인 실패!');
  }
}
```

---

## 📚 참고

- API 설정: [src/api/index.js](../../../api/index.js)
- Saga 유틸리티: [src/utils/sagaUtils.js](../../../utils/sagaUtils.js)
- 전체 가이드: [REDUX_SAGA_GUIDE.md](../../../../REDUX_SAGA_GUIDE.md)
