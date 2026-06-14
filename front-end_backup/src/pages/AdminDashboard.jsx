import React from 'react';
import Layout from '../components/Layout/Layout';
import { RefreshCcw, Users, Monitor, Mail, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

function AdminDashboard() {
  return (
    <Layout>
      <div className="dashboard-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 className="welcome-title">관리자 대시보드</h1>
            <p className="welcome-subtitle">나라장터 공고 알림 서비스의 실시간 운영 현황을 확인하세요.</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', color: '#fff', padding: '0 20px', height: '44px', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
            <RefreshCcw size={16} /> 수동 동기화 실행
          </button>
        </div>

        <div className="metric-cards">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#eff6ff', color: '#0f172a' }}><Users size={20} /></div>
            <div className="metric-trend warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>↑ 12명</div>
            <div className="metric-label">총 사용자 수</div>
            <div className="metric-value">1,284</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#ffedd5', color: '#0f172a' }}><Monitor size={20} /></div>
            <div className="metric-trend warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📈 4.2%</div>
            <div className="metric-label">유료 구독 현황</div>
            <div className="metric-value">452 <span className="metric-unit">/ 1,284</span></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}><RefreshCcw size={20} /></div>
            <div className="metric-trend info"><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div></div>
            <div className="metric-label">데이터 수집률</div>
            <div className="metric-value" style={{ marginBottom: '8px' }}>99.8%</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>최근 동기화: 14:20:05</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}><Mail size={20} /></div>
            <div className="metric-label">오늘 이메일 발송</div>
            <div className="metric-value" style={{ marginBottom: '8px', borderBottom: '3px solid #3b82f6', paddingBottom: '4px' }}>
              3,492 <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, marginLeft: '8px' }}>오류 2</span>
            </div>
          </div>
        </div>

        <div className="main-grid">
          {/* Left Column */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">시스템 로그 및 오류 현황</div>
              <a href="#" className="panel-link">전체 보기</a>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Log 1 */}
              <div style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '0 8px 8px 0' }}>
                <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#ef4444' }}>데이터 파싱 오류 (나라장터 API)</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>14:15:32</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    공고번호 20231221-00234 처리 중 예상치 못한 JSON 구조가 발견되었습니다. 해당 공고의 데이터 수집이 일시 중단되었습니다.
                  </p>
                </div>
              </div>

              {/* Log 2 */}
              <div style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: '0 8px 8px 0' }}>
                <AlertTriangle size={20} color="#f97316" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#f97316' }}>이메일 발송 지연</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>13:58:10</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    대량 발송 대기열 증가로 인해 일부 사용자(ID: user_923)에게 공고 알림이 2분 지연 발송되었습니다.
                  </p>
                </div>
              </div>

              {/* Log 3 */}
              <div style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0' }}>
                <Info size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#3b82f6' }}>시스템 정기 점검 예약</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>12:00:00</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    2024-05-30 02:00 ~ 04:00 (2시간) 동안 서버 업그레이드 및 DB 정적 성능 최적화가 진행될 예정입니다.
                  </p>
                </div>
              </div>

              {/* Log 4 */}
              <div style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: '#f8fafc', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0' }}>
                <CheckCircle2 size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#3b82f6' }}>수동 동기화 완료</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>10:45:22</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    관리자에 의한 수동 데이터 동기화가 성공적으로 완료되었습니다. 총 42건의 신규 공고가 업데이트되었습니다.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Email Log Card */}
            <div style={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '32px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '32px' }}>이메일 발송 로그 요약</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span>성공</span>
                  <span style={{ fontWeight: 700 }}>12,402건</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '90%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span>재시도</span>
                  <span style={{ fontWeight: 700 }}>124건</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '15%', height: '100%', backgroundColor: '#f97316' }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span>실패</span>
                  <span style={{ fontWeight: 700 }}>12건</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '5%', height: '100%', backgroundColor: '#64748b' }}></div>
                </div>
              </div>
            </div>

            {/* Service Status Card */}
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '24px' }}>서비스 연결 상태</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    Public API Gateway
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e' }}>ONLINE</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    Database Cluster
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e' }}>STABLE</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
                    Worker Node #04
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>HIGH LOAD</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default AdminDashboard;
