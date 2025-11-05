import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = () => {
  // 1. Saga 미들웨어 생성
  // - Redux Saga를 사용하기 위한 미들웨어 인스턴스 생성
  const sagaMiddleware = createSagaMiddleware();

  // 2. 미들웨어 배열 구성
  // - 나중에 다른 미들웨어를 추가할 수 있도록 배열로 관리
  const middlewares = [sagaMiddleware];

  // 3. Redux DevTools 설정 (개발 환경에서만 활성화)
  // - 프로덕션: 기본 compose 사용
  // - 개발: composeWithDevTools로 Redux DevTools 브라우저 확장 연동
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // 4. Store 생성
  // - rootReducer: 모든 리듀서를 합친 최종 리듀서
  // - enhancer: 미들웨어와 DevTools가 적용된 enhancer
  const store = createStore(rootReducer, enhancer);

  // 5. Saga 미들웨어 실행
  // - rootSaga를 실행하여 모든 사가들이 액션을 감시하도록 설정
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
