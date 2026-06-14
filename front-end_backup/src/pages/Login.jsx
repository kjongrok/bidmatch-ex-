import React from 'react';
import { Building2, CheckCircle2, Lock, Mail, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ display: 'flex', width: '1000px', height: '600px', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
        
        {/* Left Side */}
        <div style={{ width: '450px', backgroundColor: '#0f172a', padding: '60px 40px', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Abstract dark blue background elements could be added here */}
          <div style={{ zIndex: 1, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <Building2 size={32} />
              <span style={{ fontSize: '24px', fontWeight: 700 }}>PPI Admin</span>
            </div>
            
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Public Procurement Intelligence</h2>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '60px', lineHeight: 1.4 }}>전략적 공고 대응을 위한 데이터 인사이트</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle2 size={24} color="#60a5fa" />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>실시간 공고 매칭</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>AI 기반 맞춤형 공고 필터링 서비스</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <CheckCircle2 size={24} color="#60a5fa" />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>통합 알림 시스템</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>카카오톡/이메일 즉시 알림 제공</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '12px', color: '#64748b', zIndex: 1 }}>
            © 2024 PPI Admin. All Rights Reserved.
          </div>
        </div>

        {/* Right Side */}
        <div style={{ flex: 1, padding: '60px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>환영합니다</h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px' }}>관리자 계정으로 로그인해 주세요.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>이메일 주소</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 16px', height: '48px' }}>
                <Mail size={20} color="#94a3b8" style={{ marginRight: '12px' }} />
                <input type="email" placeholder="example@company.com" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px' }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>비밀번호</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 16px', height: '48px' }}>
                <Lock size={20} color="#94a3b8" style={{ marginRight: '12px' }} />
                <input type="password" placeholder="••••••••" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px' }} />
                <Eye size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px' }} /> 로그인 상태 유지
              </label>
              <a href="#" style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>비밀번호 재설정</a>
            </div>
            
            <button type="submit" style={{ width: '100%', height: '48px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>
              로그인
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', color: '#94a3b8' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
              <span style={{ padding: '0 16px', fontSize: '14px' }}>또는</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
            </div>
            
            <button type="button" style={{ width: '100%', height: '48px', backgroundColor: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Lock size={18} /> G2B 인증서 로그인
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#64748b' }}>
              계정이 없으신가요? <a href="#" style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}>회원가입 신청</a>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
