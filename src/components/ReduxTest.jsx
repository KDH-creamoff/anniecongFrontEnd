import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/modules/user/actions';
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from '../store/modules/user/selectors';

/**
 * Redux Saga 테스트 컴포넌트
 *
 * 사용법:
 * 1. 아무 페이지에 <ReduxTest /> 컴포넌트를 추가
 * 2. 개발자 도구 콘솔에서 Redux 액션 확인
 * 3. Redux DevTools에서 상태 변화 확인
 */
const ReduxTest = () => {
  const dispatch = useDispatch();

  // 상태 조회
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  // 컴포넌트 마운트 시 사용자 목록 조회
  useEffect(() => {
    console.log('🚀 Redux Saga Test: 사용자 목록 조회 시작');
    dispatch(fetchUsers.request());
  }, [dispatch]);

  // 상태 변화 로깅
  useEffect(() => {
    console.log('📊 Redux State:', { users, loading, error });
  }, [users, loading, error]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '20px',
      background: 'white',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      zIndex: 9999,
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>
        🧪 Redux Saga Test
      </h3>

      <div style={{ fontSize: '14px', marginBottom: '10px' }}>
        <strong>상태:</strong>
        <div style={{ marginTop: '5px' }}>
          {loading && <span style={{ color: '#FF9800' }}>⏳ 로딩 중...</span>}
          {error && <span style={{ color: '#f44336' }}>❌ 에러: {error}</span>}
          {!loading && !error && users && (
            <span style={{ color: '#4CAF50' }}>
              ✅ 성공! ({users.length}명)
            </span>
          )}
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        <strong>사용자 목록:</strong>
        {users && users.length > 0 ? (
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            {users.slice(0, 3).map((user, index) => (
              <li key={index}>{user.name || user.email || `User ${index + 1}`}</li>
            ))}
            {users.length > 3 && <li>... 외 {users.length - 3}명</li>}
          </ul>
        ) : (
          <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
            {loading ? '로딩 중...' : '데이터 없음 (API 연결 확인 필요)'}
          </p>
        )}
      </div>

      <div style={{
        marginTop: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '11px',
      }}>
        <strong>💡 확인사항:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>콘솔에서 액션 로그 확인</li>
          <li>Redux DevTools 열기 (F12)</li>
          <li>Network 탭에서 API 호출 확인</li>
        </ul>
      </div>
    </div>
  );
};

export default ReduxTest;
