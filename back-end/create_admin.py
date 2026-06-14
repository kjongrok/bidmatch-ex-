from core.database import get_connection
from services.auth_service import AuthService

c = get_connection()
cur = c.cursor()

# 1. 기존 대표님 계정 권한 복구 (일반 기업 회원으로 되돌림)
cur.execute("UPDATE users SET role = 'USER' WHERE email = 'xhxhahs2@gmail.com'")

# 2. 관리자 계정이 이미 있으면 삭제
cur.execute("DELETE FROM users WHERE email = 'admin@bidmatch.com'")
c.commit()

# 3. 새로운 관리자 계정 생성 (auth_service.signup 활용하여 비밀번호 해싱 정상 처리)
auth_service = AuthService()
auth_service.signup('admin@bidmatch.com', 'admin1234', '최고 관리자', None, None)

# 4. 생성된 관리자 계정을 ADMIN 권한으로 승급
cur.execute("UPDATE users SET role = 'ADMIN' WHERE email = 'admin@bidmatch.com'")
c.commit()

c.close()
print("Success: admin@bidmatch.com created with password admin1234")
