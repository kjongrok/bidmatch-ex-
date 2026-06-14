# BidMatch 프로젝트 컨텍스트 요약 (AI용 인수인계서)

이 문서는 이전 AI와의 대화 내용 및 작업 내역을 새로운 환경(학원 PC 등)에서 이어가기 위해 작성된 프로젝트 상태 요약본입니다.
새로운 대화를 시작할 때 AI에게 "AI_CONTEXT.md 파일을 읽고 상황을 파악해줘"라고 지시하면 이전 문맥을 완벽하게 이어갈 수 있습니다.

## 1. 프로젝트 개요
- **프로젝트명**: BidMatch (나라장터 맞춤 공고 알림 서비스)
- **프론트엔드**: React, Vite (포트: 5173)
- **백엔드**: Python Flask, PyMySQL (포트: 5000)
- **데이터베이스**: MySQL (users, company_profiles, user_match_rules, g2b_notices, notifications 등)

## 2. 지금까지 완료된 핵심 작업
1. **회원가입 및 로그인 로직 완성**
   - 일반 이메일 회원가입/로그인 (JWT 기반)
   - 소셜 로그인 연동 완료 (Google, Kakao)
   - **[핵심 특이사항]** 카카오 비즈니스 미인증으로 인해 이메일을 받을 수 없는 문제를 해결하기 위해, 카카오 로그인 직후 프론트엔드(`Layout.jsx`)에서 **강제 이메일 입력 모달**을 띄워 수신용 이메일을 입력받고 DB를 업데이트하는 로직이 적용되어 있음.
   - 계정 탈퇴 기능 및 회원 정보 수정 기능 완료 (`MyInfo.jsx`)

2. **맞춤 조건(Match Rules) 설정 기능**
   - 회원이 받고 싶은 공고의 키워드, 지역, 업종, 면허 등을 설정하고 저장하는 기능 완료.

3. **공고 수집 및 이메일 자동 발송 시스템 (검증 4단계 완료)**
   - `scheduler.py`: 나라장터 오픈 API를 찔러서 공고를 가져오고 매칭하는 스케줄러 구성 완료.
   - `email_service.py`: 매칭된 공고들을 Gmail SMTP를 사용해 예쁜 HTML 포맷의 이메일로 발송하는 로직 완료.
   - `trigger_actual_email.py`: 수동으로 전체 발송 로직을 트리거하여 메일이 도착하는 것까지 테스트 검증 완료.

4. **환경 변수 (.env)**
   - 구글/카카오 OAuth Client ID 및 Secret 설정 완료.
   - Gmail SMTP 설정 완료.
   - (학원 PC에서 클론 후 `.env.example`을 참고하여 `.env` 파일을 복구해야 함)

## 3. 남은 작업 (Next Steps)
- 프론트엔드 UI 폴리싱 및 사용자 경험 개선
- 관리자(Admin) 페이지 기능 고도화
- 실제 서버 배포 준비 및 자잘한 버그 수정

## 4. 새 환경(학원 PC) 셋업 가이드
1. 깃허브에서 클론 후 프론트엔드 `npm install`, 백엔드 `pip install -r requirements.txt` 실행.
2. 백엔드 폴더에 `.env` 파일을 생성하고 기존 DB 정보 및 OAuth, SMTP 키들을 다시 세팅.
3. 데이터베이스 생성 후 테이블 적용.
4. `python app.py` 와 `npm run dev` 실행.
