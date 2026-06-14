import os
from dotenv import load_dotenv

# 환경변수를 가장 먼저 로딩해야 email_service가 읽을 수 있습니다.
load_dotenv()

from services.email_service import email_service

def test():
    
    # 송신자 메일을 수신자 메일로 동일하게 사용 (자기 자신에게 테스트 발송)
    test_email = os.environ.get("SMTP_USER") 
    
    if not test_email or "your-email" in test_email:
        print("⚠️ 에러: .env 파일에 SMTP_USER (구글 이메일 주소)가 제대로 입력되지 않았습니다.")
        return
        
    dummy_notices = [
        {
            "title": "🔥 [테스트] 2026년 공공부문 초거대 AI 도입 사업",
            "demand_org_name": "디지털플랫폼정부위원회",
            "estimated_price": 5000000000,
            "deadline_at": "2026-06-30 18:00:00"
        },
        {
            "title": "💻 [테스트] 나라장터 클라우드 인프라 유지보수",
            "demand_org_name": "조달청",
            "estimated_price": 1200000000,
            "deadline_at": "2026-07-15 10:00:00"
        }
    ]
    
    print(f"[{test_email}] 주소로 가상의 테스트 이메일 발송을 시도합니다...")
    
    # 이메일 발송 시도
    result = email_service.send_daily_matches(test_email, "대표", dummy_notices)
    
    if result:
        print("✅ 성공적으로 테스트 이메일이 발송되었습니다! 스마트폰이나 PC에서 Gmail 메일함을 확인해주세요.")
    else:
        print("❌ 발송 실패. .env 파일의 SMTP 비밀번호나 이메일 주소를 다시 확인해주세요.")

if __name__ == "__main__":
    test()
