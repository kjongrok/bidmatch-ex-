import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Badge from '../components/UI/Badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function CalendarPage() {
  const navigate = useNavigate();
  const [allNotices, setAllNotices] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterBudget, setFilterBudget] = useState('ALL');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  useEffect(() => {
    // 1. 매칭된 맞춤형 공고 전체 가져오기
    api.get('/bid-notices/matched')
      .then(res => {
        const data = res.data;
        if (data && data.items) {
          const mapped = data.items.map(item => ({
            id: item.id,
            match: `${Math.floor(item.match_score || 99)}%`,
            name: item.title,
            org: item.notice_org_name || item.demand_org_name || "알 수 없음",
            date: item.deadline_at ? new Date(item.deadline_at) : null,
            status: item.status,
            budget: item.estimated_price || 0,
            region: item.region || '',
            region_name: item.region_name || '',
            biz_type: item.biz_type || 'UNKNOWN'
          }));
          setAllNotices(mapped);
        }
      })
      .catch(err => console.error("맞춤형 공고 데이터를 가져오는데 실패했습니다.", err));
  }, []);

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date());

  const today = new Date();
  today.setHours(0,0,0,0);

  // 필터 적용된 공고 목록 계산
  const filteredNotices = allNotices.filter(n => {
    // 1. 키워드 필터
    if (filterKeyword && !n.name.includes(filterKeyword)) return false;
    
    // 2. 상태 필터
    if (filterStatus !== 'ALL' && n.status !== filterStatus) return false;
    
    // 3. 분류 필터
    if (filterCategory !== 'ALL' && n.biz_type !== filterCategory) return false;
    
    // 4. 예산 필터
    if (filterBudget !== 'ALL') {
      const b = Number(n.budget);
      if (filterBudget === 'U_1' && b >= 100000000) return false;
      if (filterBudget === '1_5' && (b < 100000000 || b >= 500000000)) return false;
      if (filterBudget === '5_10' && (b < 500000000 || b >= 1000000000)) return false;
      if (filterBudget === 'O_10' && b < 1000000000) return false;
    }
    
    // 5. 지역 필터
    if (filterRegion !== 'ALL') {
      const regionSearch = filterRegion;
      const r = n.region || '';
      const rn = n.region_name || '';
      const org = n.org || '';
      if (!r.includes(regionSearch) && !rn.includes(regionSearch) && !org.includes(regionSearch)) return false;
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="dashboard-container" style={{ height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 className="welcome-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarIcon size={24} color="#0f172a" />
              전체 일정 캘린더
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '8px' }}>
              <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}><ChevronLeft size={20} color="#475569" /></button>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', minWidth: '100px', textAlign: 'center' }}>{year}년 {month + 1}월</span>
              <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}><ChevronRight size={20} color="#475569" /></button>
              <button onClick={handleToday} style={{ marginLeft: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#475569', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>오늘</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isFilterOpen ? '#f1f5f9' : '#fff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0 16px', height: '40px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              <Filter size={16} /> 조건 필터
            </button>
          </div>
        </div>

        {/* Filter Area (Toggleable) */}
        {isFilterOpen && (
          <div style={{ padding: '20px', marginBottom: '24px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input 
                type="text"
                placeholder="공고명 검색"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                style={{ flex: '1 1 200px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '40px', fontSize: '13px', outline: 'none' }}
              />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ flex: '1 1 120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '40px', backgroundColor: '#f8fafc', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
                <option value="ALL">상태 (전체)</option>
                <option value="OPEN">진행중</option>
                <option value="CLOSED">마감</option>
              </select>
              <select 
                value={filterBudget} 
                onChange={(e) => setFilterBudget(e.target.value)}
                style={{ flex: '1 1 120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '40px', backgroundColor: '#f8fafc', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
                <option value="ALL">예산 (전체)</option>
                <option value="U_1">1억 미만</option>
                <option value="1_5">1억 ~ 5억</option>
                <option value="5_10">5억 ~ 10억</option>
                <option value="O_10">10억 이상</option>
              </select>
              <select 
                value={filterRegion} 
                onChange={(e) => setFilterRegion(e.target.value)}
                style={{ flex: '1 1 140px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '40px', backgroundColor: '#f8fafc', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
                <option value="ALL">지역 (전국)</option>
                <option value="서울특별시">서울특별시</option>
                <option value="경기도">경기도</option>
                <option value="인천광역시">인천광역시</option>
                <option value="부산광역시">부산광역시</option>
                <option value="대구광역시">대구광역시</option>
                <option value="대전광역시">대전광역시</option>
                <option value="광주광역시">광주광역시</option>
              </select>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ flex: '1 1 120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0 12px', height: '40px', backgroundColor: '#f8fafc', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
                <option value="ALL">분류 (전체)</option>
                <option value="SERVC">용역</option>
                <option value="THNG">물품</option>
                <option value="CNST">공사</option>
              </select>
              <button 
                onClick={() => {
                  setFilterKeyword('');
                  setFilterStatus('ALL');
                  setFilterBudget('ALL');
                  setFilterRegion('ALL');
                  setFilterCategory('ALL');
                }}
                style={{ height: '40px', padding: '0 16px', backgroundColor: '#fff', color: '#64748b', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', border: '1px solid #cbd5e1' }}
              >
                초기화
              </button>
            </div>
          </div>
        )}

        <div className="card" style={{ padding: '0', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '600px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            {['일','월','화','수','목','금','토'].map((d, i) => (
              <div key={d} style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: i === 0 ? '#ef4444' : i === 6 ? '#3b82f6' : '#64748b' }}>
                {d}
              </div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, gridAutoRows: 'minmax(120px, 1fr)', backgroundColor: '#e2e8f0', gap: '1px' }}>
            
            {/* Previous month padding */}
            {[...Array(firstDayOfMonth)].map((_, i) => {
              const d = daysInPrevMonth - firstDayOfMonth + i + 1;
              return (
                <div key={`p${i}`} style={{ backgroundColor: '#fff', padding: '12px', color: '#cbd5e1' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{d}</span>
                </div>
              );
            })}
            
            {/* Current month days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              
              const noticesOnThisDay = filteredNotices.filter(n => 
                n.date && 
                n.date.getFullYear() === year && 
                n.date.getMonth() === month && 
                n.date.getDate() === day
              );
              
              return (
                <div key={day} style={{ backgroundColor: isToday ? '#f0f9ff' : '#fff', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: isToday ? 700 : 500, 
                      color: isToday ? '#0284c7' : '#334155',
                      width: '24px', height: '24px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isToday ? '#e0f2fe' : 'transparent',
                      borderRadius: '50%'
                    }}>
                      {day}
                    </span>
                    {noticesOnThisDay.length > 0 && (
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#f97316', backgroundColor: '#fff7ed', padding: '2px 6px', borderRadius: '10px' }}>
                        {noticesOnThisDay.length}건
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
                    {noticesOnThisDay.slice(0, 3).map((n, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => navigate('/notice/' + n.id)}
                        style={{ 
                          backgroundColor: '#f1f5f9', 
                          borderLeft: '3px solid #f97316', 
                          padding: '4px 6px', 
                          borderRadius: '0 4px 4px 0', 
                          fontSize: '11px', 
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: '#334155'
                        }}
                        title={n.name}
                      >
                        <strong style={{ color: '#0f172a' }}>{n.match}</strong> {n.name}
                      </div>
                    ))}
                    {noticesOnThisDay.length > 3 && (
                      <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '2px', cursor: 'pointer' }}>
                        + {noticesOnThisDay.length - 3}건 더보기
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Next month padding to complete grid */}
            {[...Array((7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7)].map((_, i) => (
              <div key={`n${i}`} style={{ backgroundColor: '#fff', padding: '12px', color: '#cbd5e1' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{i + 1}</span>
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CalendarPage;
