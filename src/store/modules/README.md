# Redux Modules 구조 가이드

각 도메인별 폴더는 다음 파일들로 구성됩니다:

```
modules/
└── [domain]/
    ├── actions.js    # 액션 타입 & 액션 생성자
    ├── reducer.js    # 리듀서
    ├── sagas.js      # 사가 (비동기 로직)
    └── selectors.js  # 셀렉터 (상태 조회)
```

## 파일별 역할

### actions.js
- 액션 타입 상수 정의
- 액션 생성자 함수 정의
- 예: REQUEST, SUCCESS, FAILURE 패턴

### reducer.js
- 초기 상태 정의
- 리듀서 함수 구현
- 액션에 따른 상태 변경 로직

### sagas.js
- API 호출 등 비동기 로직
- 액션 감시 및 처리
- 에러 핸들링

### selectors.js
- 상태 조회 함수
- 파생 데이터 계산
- 재사용 가능한 상태 선택자
