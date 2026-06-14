import React from 'react';
import Sidebar from './Sidebar';
import { Search, Bell } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">Dashboard</div>
            <div className="topbar-search">
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="공고 검색..." />
            </div>
          </div>
          <div className="topbar-right">
            <Bell size={20} color="#64748b" />
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">홍길동님</span>
                <span className="user-role">일반회원</span>
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
