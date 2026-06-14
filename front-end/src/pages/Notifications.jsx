import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Badge from '../components/UI/Badge';
import { Mail, CheckCircle2, AlertCircle, Target, Filter, Download, ChevronRight, ChevronLeft, Bell } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterReadStatus, setFilterReadStatus] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Fetch notifications
    api.get('/notifications?limit=50').then(res => {
      if (res.data.success) {
        setNotifications(res.data.items || []);
      }
    });

    // 2. Mark all as read
    api.put('/notifications/read-all').catch(err => console.error(err));
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (filterKeyword && !n.title.includes(filterKeyword) && !n.message.includes(filterKeyword)) return false;
    if (filterReadStatus === 'READ' && !n.is_read) return false;
    if (filterReadStatus === 'UNREAD' && n.is_read) return false;
    return true;
  });

  const downloadCSV = () => {
    if (filteredNotifications.length === 0) {
      alert('다운로드할 이력이 없습니다.');
      return;
    }
    const headers = ['알림 일시', '상태', '제목', '내용'];
    const rows = filteredNotifications.map(n => [
      `"${new Date(n.created_at).toLocaleString()}"`,
      n.is_read ? '읽음' : '새 알림',
      `"${n.title.replace(/"/g, '""')}"`,
      `"${n.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `알림이력_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="dashboard-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 className="welcome-title">나라장터 공고 알림 - 알림 이력</h1>
            <p className="welcome-subtitle">최근 30일간 발송된 일일 다이제스트 알림 내역입니다.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isFilterOpen ? '#cbd5e1' : '#e2e8f0', color: '#0f172a', padding: '0 20px', height: '44px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              <Filter size={16} /> 필터링
            </button>
            <button 
              onClick={downloadCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', color: '#fff', padding: '0 20px', height: '44px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
              <Download size={16} /> 이력 다운로드 (CSV)
            </button>
          </div>
        </div>

        {/* Filter Area */}
        {isFilterOpen && (
          <div style={{ padding: '20px', marginBottom: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="제목, 내용 검색"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              style={{ flex: '1 1 300px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 16px', height: '44px', fontSize: '14px', outline: 'none' }}
            />
            <select 
              value={filterReadStatus} 
              onChange={(e) => setFilterReadStatus(e.target.value)}
              style={{ flex: '0 0 150px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '44px', backgroundColor: '#f8fafc', fontSize: '14px', cursor: 'pointer', outline: 'none' }}>
              <option value="ALL">상태 (전체)</option>
              <option value="READ">읽음</option>
              <option value="UNREAD">새 알림</option>
            </select>
            <button 
              onClick={() => {
                setFilterKeyword('');
                setFilterReadStatus('ALL');
              }}
              style={{ height: '44px', padding: '0 20px', backgroundColor: '#fff', color: '#64748b', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', border: '1px solid #cbd5e1' }}
            >
              초기화
            </button>
          </div>
        )}

        <div className="metric-cards">
          <div className="metric-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className="metric-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6', marginBottom: 0 }}><Bell size={20} /></div>
            </div>
            <div className="metric-label">총 수신 알림</div>
            <div className="metric-value" style={{ marginBottom: '8px' }}>{notifications.length} <span className="metric-unit">건</span></div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              수신된 전체 맞춤형 알림
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#f0fdf4', color: '#22c55e' }}><CheckCircle2 size={20} /></div>
            <div className="metric-label">읽은 알림</div>
            <div className="metric-value" style={{ marginBottom: '8px' }}>{notifications.filter(n => n.is_read).length} <span className="metric-unit">건</span></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}><AlertCircle size={20} /></div>
            <div className="metric-label">새로운 알림</div>
            <div className="metric-value" style={{ marginBottom: '8px', color: '#ef4444' }}>{notifications.filter(n => !n.is_read).length} <span className="metric-unit" style={{ color: '#ef4444' }}>건</span></div>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>알림 일시</th>
                  <th>상태</th>
                  <th>제목</th>
                  <th>알림 내용</th>
                  <th style={{ textAlign: 'right' }}>상세 보기</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((n, i) => {
                  const d = new Date(n.created_at);
                  const dateStr = d.toLocaleDateString();
                  const timeStr = d.toLocaleTimeString();
                  return (
                    <tr key={i} style={{ backgroundColor: n.is_read ? 'transparent' : '#f8fafc' }}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{dateStr}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{timeStr}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: n.is_read ? '#64748b' : '#3b82f6', fontWeight: 600 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: n.is_read ? '#64748b' : '#3b82f6' }}></div>
                          {n.is_read ? '읽음' : '새 알림'}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>
                        {n.title}
                      </td>
                      <td style={{ color: '#475569' }}>
                        {n.message}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {n.bid_notice_id && (
                          <button onClick={() => navigate('/notice/' + n.bid_notice_id)} style={{ backgroundColor: 'transparent', color: '#3b82f6', border: 'none', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            공고 보기 <ChevronRight size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>총 {filteredNotifications.length}건</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#94a3b8' }}><ChevronLeft size={16} /></button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #0f172a', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', fontWeight: 600 }}>1</button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#334155' }}>2</button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#334155' }}>3</button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#334155' }}>4</button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#334155' }}>5</button>
              <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#fff', color: '#334155' }}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

export default Notifications;
