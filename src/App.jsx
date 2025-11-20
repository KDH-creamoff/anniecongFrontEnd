import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
import Dash from './pages/Dash';
import Basic from './pages/Basic';
import Receiving from './pages/Receiving';
import Manufacturing from './pages/Manufacturing';
import Inventory from './pages/Inventory';
import Shipping from './pages/Shipping';
import ApprovalDashboard from './pages/ApprovalDashboard';
import Label from './pages/Label';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import ProtectedRoute from './components/ProtectedRoute';
import { isMobile } from 'react-device-detect';
import Scanner from './pages/Scanner';

export default function App() {
  useEffect(() => {
    console.log(isMobile);
  }, []);
  console.log(isMobile);
  return (
    <Routes>
      {
        isMobile ? (
          <Route path='*' element={<>모바일 페이지입니다.</>} />
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* 메인 애플리케이션 라우트 */}
            <Route path='/' element={<Navigate to='/dash' replace />} />
            <Route path='/' element={<Home />}>
              <Route
                path='dash'
                element={
                  <ProtectedRoute permission='dash'>
                    <Dash />
                  </ProtectedRoute>
                }
              />
              <Route
                path='basic'
                element={
                  <ProtectedRoute permission='basic'>
                    <Basic />
                  </ProtectedRoute>
                }
              />
              <Route
                path='receiving/nav1'
                element={
                  <ProtectedRoute permission='receiving'>
                    <Receiving subPage='nav1' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='receiving/nav2'
                element={
                  <ProtectedRoute permission='receiving'>
                    <Receiving subPage='nav2' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='manufacturing/nav1'
                element={
                  <ProtectedRoute permission='manufacturing'>
                    <Manufacturing subPage='nav1' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='manufacturing/nav2'
                element={
                  <ProtectedRoute permission='manufacturing'>
                    <Manufacturing subPage='nav2' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='manufacturing/nav3'
                element={
                  <ProtectedRoute permission='manufacturing'>
                    <Manufacturing subPage='nav3' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='manufacturing/nav4'
                element={
                  <ProtectedRoute permission='manufacturing'>
                    <Manufacturing subPage='nav4' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='manufacturing/nav5'
                element={
                  <ProtectedRoute permission='manufacturing'>
                    <Manufacturing subPage='nav5' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='inventory'
                element={
                  <ProtectedRoute permission='inventory'>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path='shipping'
                element={
                  <ProtectedRoute permission='shipping'>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path='approval/nav1'
                element={
                  <ProtectedRoute permission='approval'>
                    <ApprovalDashboard subPage='nav1' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='approval/nav2'
                element={
                  <ProtectedRoute permission='approval'>
                    <ApprovalDashboard subPage='nav2' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='label'
                element={
                  <ProtectedRoute permission='label'>
                    <Label />
                  </ProtectedRoute>
                }
              />
              <Route
                path='user/nav1'
                element={
                  <ProtectedRoute permission='user'>
                    <UserManagement subPage='nav1' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='user/nav2'
                element={
                  <ProtectedRoute permission='user'>
                    <UserManagement subPage='nav2' />
                  </ProtectedRoute>
                }
              />
              <Route path='mypage' element={<Mypage />} />
            </Route>
          </>
        )
      }
    </Routes>
  );
}
