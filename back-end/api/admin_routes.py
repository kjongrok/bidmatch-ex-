from flask import Blueprint, jsonify
from core.database import get_connection
from utils.auth_decorator import require_auth

admin_bp = Blueprint('admin', __name__)

@admin_bp.get('/stats')
@require_auth
def get_stats():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) as count FROM users")
            total_users = cursor.fetchone()['count']
            
            cursor.execute("SELECT COUNT(*) as count FROM user_match_rules")
            total_rules = cursor.fetchone()['count']
            
            cursor.execute("SELECT COUNT(*) as count FROM bid_notices")
            total_notices = cursor.fetchone()['count']
            
            cursor.execute("SELECT COUNT(*) as count FROM match_results")
            total_matches = cursor.fetchone()['count']
            
            return jsonify({
                "success": True,
                "data": {
                    "total_users": total_users,
                    "total_rules": total_rules,
                    "total_notices": total_notices,
                    "total_matches": total_matches
                }
            })
    except Exception as e:
        print("Admin stats error:", e)
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        conn.close()
