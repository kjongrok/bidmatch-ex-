import React from 'react';
import Layout from '../components/Layout/Layout';
import Badge from '../components/UI/Badge';
import { ArrowLeft, Heart, Share2, FileText, Calendar, Clock, AlarmClock, ExternalLink, TrendingUp, CheckCircle2, AlertCircle, FileCode, Download } from 'lucide-react';

function NoticeDetail() {
  return (
    <Layout>
      <div style={{ backgroundColor: '#f8fafc', padding: '0 40px 40px' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#64748b', padding: '24px 0' }}>
          <span>공고 현황</span>
          <span>&gt;</span>
          <span>일반 용역</span>
          <span>&gt;</span>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>공고번호 20240523145-00</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Title Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Badge variant="info" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>긴급공고</Badge>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', color: '#fff', padding: '0 16px', height: '40px', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
                    <Heart size={16} /> 관심 등록
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#64748b' }}>
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              
              <h1 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.4, marginBottom: '40px', color: '#0f172a' }}>
                2024년도 지능형 맞춤형 입찰 정보 제공 시스템 고도화 사업
              </h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>공고번호</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>20240523145-00</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>수요기관</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>조달청</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>계약방법</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>제한경쟁 (협상에 의한 계약)</div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <FileText size={20} color="#0f172a" />
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>공고 요약 및 주요 키워드</h2>
              </div>
              
              <div style={{ backgroundColor: '#f1f5f9', padding: '24px', borderRadius: '12px', fontSize: '15px', lineHeight: 1.6, color: '#334155', marginBottom: '24px' }}>
                본 사업은 현재 운영 중인 나라장터 입찰 정보 시스템의 AI 알고리즘을 고도화하여 사용자별 최적화된 공고 추천 기능을 강화하고, 빅데이터 기반의 낙찰 예측 모델을 구축하는 것을 목적으로 합니다. 특히 클라우드 네이티브 아키텍처 전환을 통한 시스템 안정성 확보가 주요 과업입니다.
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['#AI_추천알고리즘', '#빅데이터_분석', '#클라우드_전환', '#정보화전략계획(ISP)', '#지능형_정부'].map(tag => (
                  <span key={tag} style={{ backgroundColor: '#e2e8f0', color: '#475569', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Detail Table */}
            <div className="card" style={{ padding: '0' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700 }}>상세 공고 명세</h2>
              </div>
              <div className="table-wrapper">
                <table style={{ margin: 0 }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '200px', backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 600, fontSize: '14px' }}>입찰방식</td>
                      <td>전자입찰 (지문인식 신원확인 입찰)</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 600, fontSize: '14px' }}>공고기관</td>
                      <td>조달청 본청</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 600, fontSize: '14px' }}>추정가격</td>
                      <td>₩ 1,250,000,000 (VAT 별도)</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: '#f8fafc', color: '#64748b', fontWeight: 600, fontSize: '14px', borderBottom: 'none' }}>사업기간</td>
                      <td style={{ borderBottom: 'none' }}>착수일로부터 180일</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Budget & Date Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>배정 예산</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>₩ 1,375,000,000</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>(VAT 포함)</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px' }}>
                    <Calendar size={16} /> 게시 일시
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>2024.05.23 10:00</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '14px' }}>
                    <Clock size={16} /> 마감 일시
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#ef4444' }}>2024.06.03 11:00</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#fef2f2', color: '#ef4444', height: '48px', borderRadius: '8px', fontWeight: 700, fontSize: '18px', marginBottom: '24px' }}>
                <AlarmClock size={20} /> D - 11
              </div>
              
              <button style={{ width: '100%', height: '48px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                <ExternalLink size={18} /> 나라장터 원본 공고 보기
              </button>
              <button style={{ width: '100%', height: '48px', backgroundColor: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                목록으로 돌아가기
              </button>
            </div>

            {/* Match Analysis Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <TrendingUp size={18} color="#0f172a" />
                <h2 style={{ fontSize: '16px', fontWeight: 700 }}>우리 기업 매칭 분석</h2>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: '#64748b' }}>적합도 점수</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>92%</div>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '24px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: '#3b82f6' }}></div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#22c55e" /> 최근 3년 유사 용역 실적 보유
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#22c55e" /> SW사업자 신고 완료
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#334155' }}>
                  <AlertCircle size={16} color="#ef4444" /> 직접생산확인증명서 갱신 필요
                </div>
              </div>
            </div>

            {/* Attachments Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '24px' }}>첨부파일 (3)</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 500 }}>
                    <FileText size={20} color="#ef4444" /> 제안요청서.pdf
                  </div>
                  <Download size={18} color="#94a3b8" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 500 }}>
                    <FileCode size={20} color="#3b82f6" /> 입찰유의서.hwp
                  </div>
                  <Download size={18} color="#94a3b8" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </Layout>
  );
}

export default NoticeDetail;
