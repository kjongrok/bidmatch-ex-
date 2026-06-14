import React from 'react';
import Layout from '../components/Layout/Layout';
import Badge from '../components/UI/Badge';
import { FileText, Target, Clock, Send, MailCheck, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

function UserDashboard() {
  const notices = [
    { match: "92%", name: "클라우드 기반 시스템 구축 사업", org: "한국전력공사", date: "2025-05-28", budget: "500,000,000", highlightDate: true },
    { match: "89%", name: "차세대 정보시스템 통합 구축", org: "국민건강보험공단", date: "2025-05-30", budget: "800,000,000", highlightDate: true },
    { match: "85%", name: "전산 인프라 유지보수 용역", org: "서울특별시교육청", date: "2025-06-02", budget: "120,000,000", highlightDate: false },
    { match: "83%", name: "AI 기반 빅데이터 분석 플랫폼 ...", org: "한국도로공사", date: "2025-06-03", budget: "450,000,000", highlightDate: false },
    { match: "80%", name: "스마트 오피스 환경 구축 사업", org: "한국수자원공사", date: "2025-06-05", budget: "230,000,000", highlightDate: false },
  ];

  const notifications = [
    { date: "2025-05-25 09:00", count: 7 },
    { date: "2025-05-24 09:00", count: 5 },
    { date: "2025-05-23 09:00", count: 6 },
  ];

  return (
    <Layout>
      <div className="dashboard-container">
        
        <div className="welcome-section">
          <h1 className="welcome-title">안녕하세요, 홍길동님!</h1>
          <p className="welcome-subtitle">오늘의 공고 알림 현황을 확인해보세요.</p>
        </div>

        <div className="metric-cards">
          <div className="metric-card">
            <div className="metric-icon"><FileText size={20} /></div>
            <div className="metric-trend danger">전일 대비 ▲ 8건</div>
            <div className="metric-label">오늘 신규 공고</div>
            <div className="metric-value">25<span className="metric-unit">건</span></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{backgroundColor: '#fff7ed', color: '#ea580c'}}><Target size={20} /></div>
            <div className="metric-trend danger">전일 대비 ▲ 2건</div>
            <div className="metric-label">내 매칭 공고</div>
            <div className="metric-value">7<span className="metric-unit">건</span></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{backgroundColor: '#fefce8', color: '#ca8a04'}}><Clock size={20} /></div>
            <div className="metric-trend warning">3일 이내 마감</div>
            <div className="metric-label">마감 임박 공고</div>
            <div className="metric-value">3<span className="metric-unit">건</span></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{backgroundColor: '#eff6ff', color: '#2563eb'}}><Send size={20} /></div>
            <div className="metric-trend info">오늘 09:00 발송</div>
            <div className="metric-label">알림 발송 현황</div>
            <div className="metric-value" style={{color: '#0f172a'}}>완료</div>
          </div>
        </div>

        <div className="main-grid">
          {/* Left Column */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">최근 매칭 공고</div>
                <a href="#" className="panel-link">전체 보기</a>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>일치도</th>
                      <th>공고명</th>
                      <th>기관명</th>
                      <th>마감일</th>
                      <th>예산(원)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((n, i) => (
                      <tr key={i}>
                        <td><Badge variant="info">{n.match}</Badge></td>
                        <td style={{fontWeight: 700}}>{n.name}</td>
                        <td style={{color: 'var(--color-text-sub)'}}>{n.org}</td>
                        <td style={{color: n.highlightDate ? 'var(--color-danger)' : 'var(--color-text-main)', fontWeight: n.highlightDate ? 600 : 400}}>{n.date}</td>
                        <td>{n.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">최근 알림 이력</div>
                <a href="#" className="panel-link">전체 보기</a>
              </div>
              <div className="noti-list">
                {notifications.map((n, i) => (
                  <div className="noti-item" key={i}>
                    <div className="noti-item-left">
                      <div className="noti-icon"><MailCheck size={20} /></div>
                      <div className="noti-content">
                        <strong>일일 매칭 공고 알림</strong>
                        <span>{n.date} | 총 {n.count}건</span>
                      </div>
                    </div>
                    <Badge variant="success">발송 완료</Badge>
                  </div>
                ))}
              </div>
              <button className="more-btn">더 보기 <ChevronDown size={14} style={{display:'inline', verticalAlign:'middle'}} /></button>
            </div>
          </div>

          {/* Right Column (Calendar) */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">마감 임박 공고 캘린더</div>
              <a href="#" className="panel-link">전체 캘린더 보기</a>
            </div>
            <div className="calendar-container">
              <div className="calendar-header">
                <ChevronLeft size={18} />
                <span>2025년 5월</span>
                <ChevronRight size={18} />
              </div>
              <div className="calendar-grid">
                {['일','월','화','수','목','금','토'].map(d => <div key={d} className="calendar-day-name">{d}</div>)}
                
                {/* May 2025 Calendar mock */}
                {/* Previous month days */}
                {[27,28,29,30].map(d => <div key={`p${d}`} className="calendar-cell muted">{d}</div>)}
                
                {/* Days 1 to 31 */}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  let className = "calendar-cell";
                  if (day === 28) className += " active-blue";
                  if (day === 30) className += " active-orange";
                  
                  return (
                    <div key={day} className={className}>
                      {day}
                      {day === 6 && <div className="calendar-dot orange" />}
                      {day === 9 && <div className="calendar-dot orange" />}
                      {day === 13 && <div className="calendar-dot orange" />}
                      {day === 15 && <div className="calendar-dot orange" />}
                      {day === 21 && <div className="calendar-dot blue" />}
                    </div>
                  );
                })}
              </div>

              <div className="calendar-events">
                <div className="event-item">
                  <div className="event-date">05.28<br/>(수)</div>
                  <div className="event-info">
                    <div className="event-title">클라우드 기반 시스템 구축 사업</div>
                    <div className="event-org">한국전력공사</div>
                  </div>
                  <div className="event-badge danger">D-3</div>
                </div>
                <div className="event-item">
                  <div className="event-date">05.30<br/>(금)</div>
                  <div className="event-info">
                    <div className="event-title">차세대 정보시스템 통합 구축</div>
                    <div className="event-org">국민건강보험공단</div>
                  </div>
                  <div className="event-badge warning">D-5</div>
                </div>
                <div className="event-item">
                  <div className="event-date">06.02<br/>(월)</div>
                  <div className="event-info">
                    <div className="event-title">전산 인프라 유지보수 용역</div>
                    <div className="event-org">서울특별시교육청</div>
                  </div>
                  <div className="event-badge warning">D-8</div>
                </div>
              </div>
              
              <div style={{textAlign:'center', marginTop:'16px'}}>
                <button className="more-btn">더 보기 <ChevronDown size={14} style={{display:'inline', verticalAlign:'middle'}} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div>© 2025 나라장터 공고 알림 서비스. All rights reserved.</div>
          <div className="footer-links">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">고객센터</a>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default UserDashboard;
