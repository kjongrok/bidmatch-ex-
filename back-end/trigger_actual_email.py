from dotenv import load_dotenv
load_dotenv()

import sys
import os

# 모듈 경로 추가
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scheduler import daily_email_job

print("=========================================")
print("📧 실제 매칭 공고 이메일 수동 발송을 시작합니다.")
print("=========================================")

try:
    daily_email_job()
    print("=========================================")
    print("✅ 실제 공고 이메일 발송 작업이 끝났습니다!")
    print("메일함을 확인해주세요. (만약 메일이 오지 않았다면, 계정 설정에서 이메일 수신 동의가 되어 있는지, 혹은 오늘 매칭된 공고가 존재하는지 확인해주세요)")
except Exception as e:
    print(f"❌ 오류 발생: {e}")
