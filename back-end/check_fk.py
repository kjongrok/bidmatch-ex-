from core.database import get_connection

with get_connection() as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT TABLE_NAME, CONSTRAINT_NAME, DELETE_RULE FROM information_schema.REFERENTIAL_CONSTRAINTS WHERE REFERENCED_TABLE_NAME='users' AND CONSTRAINT_SCHEMA=DATABASE()")
        res = cur.fetchall()
        for r in res:
            print(r)
