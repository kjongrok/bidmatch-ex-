import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import NoticeDetail from './pages/NoticeDetail';
import AdminDashboard from './pages/AdminDashboard';
import NoticeList from './pages/NoticeList';
import InterestConditions from './pages/InterestConditions';
import MyInfo from './pages/MyInfo';
import Notifications from './pages/Notifications';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PasswordReset';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/notices" element={<ProtectedRoute><NoticeList /></ProtectedRoute>} />
          <Route path="/notice/:id" element={<ProtectedRoute><NoticeDetail /></ProtectedRoute>} />
          <Route path="/conditions" element={<ProtectedRoute><InterestConditions /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyInfo /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
