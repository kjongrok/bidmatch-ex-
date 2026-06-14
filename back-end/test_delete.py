import os
from app_factory import create_app
from core.database import get_connection
from utils.jwt_utils import encode_jwt

app = create_app()
app.config['TESTING'] = True
client = app.test_client()

# 1. Create a dummy user
with get_connection() as conn:
    with conn.cursor() as cur:
        cur.execute("INSERT INTO users (email, name, role) VALUES ('test_delete@example.com', 'Test Delete', 'USER')")
        user_id = cur.lastrowid
    conn.commit()
    print(f"Created dummy user with ID: {user_id}")

# 2. Mint a JWT token
token = encode_jwt(user_id, 'test_delete@example.com', 'USER')

# 3. Test the DELETE endpoint
res = client.delete('/api/auth/me', headers={'Authorization': f'Bearer {token}'})
print("STATUS:", res.status_code)
print("RESPONSE:", res.get_json())

# 4. Verify deletion
with get_connection() as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        print("User in DB after delete:", user)
