from core.database import get_connection

c = get_connection()
cur = c.cursor()
# 대표님의 계정을 관리자로 승급
cur.execute("UPDATE users SET role = 'ADMIN' WHERE email = 'xhxhahs2@gmail.com'")
c.commit()
print("Successfully upgraded to ADMIN!")
