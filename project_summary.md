# BidMatch 프로젝트 현황 및 인수인계 문서 (Handoff)

> **Antigravity AI 행동 지침**
> 이 문서를 읽은 AI는 기존 대화 내역을 모두 파악한 것으로 간주하고, 아래의 '다음 작업 목표'부터 곧바로 작업을 재개해야 합니다.

## 1. 프로젝트 개요
- **프로젝트명**: BidMatch
- **목적**: 공공데이터포털(나라장터 등)의 공고를 스크래핑하여 사용자(기업)의 면허 및 자격 조건과 매칭해 주는 입찰 정보 제공 플랫폼.
- **기술 스택**: 
  - Backend: Python (Flask), PyMySQL, apscheduler
  - Frontend: React (Vite), Tailwind CSS (Vanilla CSS 기반 UI), Lucide React
  - Database: MySQL

## 2. 현재까지 완료된 주요 기능
1. **공고 수집 및 캘린더 매칭**: 백엔드 스케줄러를 통해 공고를 수집하고, 프론트엔드 캘린더(`CalendarPage.jsx`)에서 상태, 예산, 지역, 분류별 필터링 기능 완료.
2. **알림 이력 관리**: `Notifications.jsx`에서 알림 검색, 상태 필터링, 그리고 **CSV 다운로드** 기능 완벽 구현.
3. **사용자 및 기업 정보 관리 (MyInfo.jsx)**:
   - 3개의 탭(개인 정보, 기업 정보, 보안) UI 구축 완료.
   - **사업자등록번호 검증**: Mock API를 통해 10자리 숫자 입력 시 "인증 완료" 처리 로직 구현.
   - **우대 정책 및 면허 증빙**: 여성/장애인/청년 기업 체크 및 증빙 서류 업로드(파일 선택 후 대기 상태 변경) UI 구현.
   - **보유 면허 리스트 추가 모달**: 주요 면허 10종을 체크박스와 검색창(Search)을 이용해 다중 선택할 수 있도록 고도화 완료.
   - 비밀번호 변경 암호화(Bcrypt) 및 DB 연동 완료.

## 3. 데이터베이스 주요 스키마 변경점
`company_profiles` 테이블에 최근 다음 컬럼이 추가되었습니다:
- `is_verified` (TINYINT): 사업자번호 인증 여부 (0: 미인증, 1: 인증완료)
- `verification_status` (VARCHAR): 서류 검증 상태 ('NONE', 'PENDING', 'APPROVED', 'REJECTED')

## 4. 다음 작업 목표 (노트북에서 이어서 할 작업)
- **목표**: `[관리자 대시보드(Admin Dashboard) 구축]`
- **상세 내용**:
  - `MyInfo.jsx`에서 사용자들이 업로드한 '증빙 서류' 상태(`PENDING`)를 관리자가 확인하는 페이지 구축.
  - 가입된 기업 목록 조회 및 해당 기업의 서류를 보고 `[승인(APPROVED)]` 또는 `[반려(REJECTED)]` 처리하는 기능.
  - 관리자 전용 백엔드 API (`/api/admin/verify-company` 등) 개발 및 프론트엔드 연동.

---

**[사용자 가이드]**
노트북에서 이 프로젝트를 여신 후, 저에게 이렇게 말씀해 주세요!
> "project_summary.md 읽고 관리자 대시보드 쪽 작업 이어서 진행해 줘"
