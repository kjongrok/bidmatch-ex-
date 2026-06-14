import io
from core.database import get_connection

c = get_connection()
cur = c.cursor()
cur.execute('SELECT title FROM bid_notices ORDER BY id DESC LIMIT 10')
with io.open('temp_titles_3.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join([r['title'] for r in cur.fetchall()]))
