import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Search, Bell } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/api';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      api.get('/notifications?limit=1').then(res => {
        if (res.data.success) {
          setUnreadCount(res.data.unreadCount || 0);
        }
      }).catch(err => console.error(err));
    }
  }, [user]);

  let pageTitle = "Dashboard";
  if (location.pathname === '/notices') pageTitle = "공고 목록";
  else if (location.pathname.startsWith('/notice/')) pageTitle = "공고 상세";
  else if (location.pathname === '/calendar') pageTitle = "전체 캘린더";
  else if (location.pathname === '/notifications') pageTitle = "알림 이력";
  else if (location.pathname === '/conditions') pageTitle = "관심 조건 관리";
  else if (location.pathname === '/admin') pageTitle = "관리자 설정";
  else if (location.pathname === '/profile') pageTitle = "내 정보";

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">{pageTitle}</div>
          </div>
          <div className="topbar-right">
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/notifications')}>
              <Bell size={20} color="#64748b" />
              {unreadCount > 0 && (
                <div style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </div>
              )}
            </div>
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{user?.name || '회원'}님</span>
                <span className="user-role">{user?.role === 'ADMIN' ? '관리자' : '일반회원'}</span>
              </div>
              <div className="user-avatar">
                {/* Image or initials */}
              </div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
