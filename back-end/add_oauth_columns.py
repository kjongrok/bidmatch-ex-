from core.database import get_connection

c = get_connection()
cur = c.cursor()

try:
    # 컬럼 추가 (이미 있으면 무시될 수 있도록 try-except, 또는 에러나면 무시)
    cur.execute("ALTER TABLE users ADD COLUMN auth_provider VARCHAR(50) DEFAULT 'local'")
    cur.execute("ALTER TABLE users ADD COLUMN oauth_id VARCHAR(255) DEFAULT NULL")
    
    # oauth_id가 길 수 있으므로 UNIQUE KEY도 추가 (제공자와 ID 조합)
    cur.execute("ALTER TABLE users ADD UNIQUE KEY uk_users_oauth (auth_provider, oauth_id)")
    
    # password_hash는 local 가입 시 필수지만 소셜은 없으므로 NULL 허용으로 변경
    cur.execute("ALTER TABLE users MODIFY COLUMN password_hash VARCHAR(255) NULL")
    
    c.commit()
    print("Successfully added OAuth columns to users table.")
except Exception as e:
    print(f"Error (or columns already exist): {e}")
finally:
    c.close()
