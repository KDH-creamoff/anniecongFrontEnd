import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dash from './pages/Dash';
import Basic from './pages/Basic';
import Receiving from './pages/Receiving';
import Manufacturing from './pages/Manufacturing';
import Inventory from './pages/Inventory';
import Shipping from './pages/Shipping';
import Production from './pages/Production';
import ApprovalDashboard from './pages/ApprovalDashboard';
import Label from './pages/Label';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';

export default function App() {
  return (
    <Routes>
      {/* 로그인/회원가입 라우트 */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* 메인 애플리케이션 라우트 */}
      <Route path='/' element={<Navigate to='/dash' replace />} />
      <Route path='/' element={<Home />}>
        <Route path='dash' element={<Dash />} />
        <Route path='basic' element={<Basic />} />
        <Route path='receiving' element={<Receiving />} />
        <Route
          path='manufacturing/nav1'
          element={<Manufacturing subPage='nav1' />}
        />
        <Route
          path='manufacturing/nav2'
          element={<Manufacturing subPage='nav2' />}
        />
        <Route
          path='manufacturing/nav3'
          element={<Manufacturing subPage='nav3' />}
        />
        <Route path='inventory' element={<Inventory />} />
        <Route path='shipping/nav1' element={<Shipping subPage='nav1' />} />
        <Route path='shipping/nav2' element={<Shipping subPage='nav2' />} />
        <Route path='shipping/nav3' element={<Shipping subPage='nav3' />} />
        <Route path='production/nav1' element={<Production subPage='nav1' />} />
        <Route path='production/nav2' element={<Production subPage='nav2' />} />
        <Route
          path='approval/nav1'
          element={<ApprovalDashboard subPage='nav1' />}
        />
        <Route
          path='approval/nav2'
          element={<ApprovalDashboard subPage='nav2' />}
        />
        <Route path='label' element={<Label />} />
        <Route path='user' element={<UserManagement />} />
        <Route path='mypage' element={<Mypage />} />
      </Route>
    </Routes>
  );
}
