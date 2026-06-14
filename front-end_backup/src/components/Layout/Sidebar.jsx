import React from 'react';
import { Building2, LayoutDashboard, List, SlidersHorizontal, Bell, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Building2 size={24} color="#fff" />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontSize: '18px', fontWeight: 700, lineHeight: 1.2}}>PPI Admin</span>
          <span style={{fontSize: '11px', color: '#94a3b8'}}>Procurement Intelligence</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <button className="nav-item active">
          <LayoutDashboard size={20} />
          <span>대시보드</span>
        </button>
        <button className="nav-item">
          <List size={20} />
          <span>공고 목록</span>
        </button>
        <button className="nav-item">
          <SlidersHorizontal size={20} />
          <span>관심 조건 관리</span>
        </button>
        <button className="nav-item">
          <Bell size={20} />
          <span>알림 이력</span>
        </button>
        <button className="nav-item">
          <User size={20} />
          <span>내 정보</span>
        </button>
        <button className="nav-item">
          <Settings size={20} />
          <span>설정</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
