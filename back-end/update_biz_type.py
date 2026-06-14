import sys
import os
sys.path.append('c:\\AI_1team\\BidMatch\\back-end')
from core.database import get_connection

def update_biz_types():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # 용역 (SERVC)
            cursor.execute("UPDATE bid_notices SET biz_type = 'SERVC' WHERE biz_type = 'UNKNOWN' AND title LIKE '%용역%'")
            # 물품/제조 (THNG)
            cursor.execute("UPDATE bid_notices SET biz_type = 'THNG' WHERE biz_type = 'UNKNOWN' AND (title LIKE '%구매%' OR title LIKE '%제조%')")
            # 공사 (CNST)
            cursor.execute("UPDATE bid_notices SET biz_type = 'CNST' WHERE biz_type = 'UNKNOWN' AND title LIKE '%공사%'")
            
            conn.commit()
            cursor.execute("SELECT biz_type, count(*) FROM bid_notices GROUP BY biz_type")
            print("DB Update Complete. Current biz_type distribution:")
            for row in cursor.fetchall():
                print(row)
    finally:
        conn.close()

if __name__ == '__main__':
    update_biz_types()
