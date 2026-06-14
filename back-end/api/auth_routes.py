from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from utils.auth_decorator import require_auth

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()

@auth_bp.post('/signup')
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Invalid request payload"}), 400

    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    company_name = data.get('company_name')
    business_registration_no = data.get('business_registration_no')

    if not email or not password or not name:
        return jsonify({"success": False, "message": "Email, password, and name are required"}), 400

    result, status_code = auth_service.signup(email, password, name, company_name, business_registration_no)
    return jsonify(result), status_code

@auth_bp.post('/login')
def login():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Invalid request payload"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    result, status_code = auth_service.login(email, password)
    return jsonify(result), status_code

@auth_bp.get('/me')
@require_auth
def get_me():
    user_id = request.user['sub']
    result, status_code = auth_service.get_me(user_id)
    return jsonify(result), status_code

@auth_bp.put('/me')
@require_auth
def update_me():
    user_id = request.user['sub']
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({"success": False, "message": "Name is required"}), 400
    
    result, status_code = auth_service.update_user(user_id, name)
    return jsonify(result), status_code

@auth_bp.put('/me/company')
@require_auth
def update_company():
    user_id = request.user['sub']
    data = request.get_json()
    result, status_code = auth_service.update_company(user_id, data)
    return jsonify(result), status_code

@auth_bp.put('/me/password')
@require_auth
def update_password():
    user_id = request.user['sub']
    data = request.get_json()
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        return jsonify({"success": False, "message": "Both old and new passwords are required"}), 400

    result, status_code = auth_service.update_password(user_id, old_password, new_password)
    return jsonify(result), status_code

@auth_bp.post('/verify-business')
@require_auth
def verify_business():
    user_id = request.user['sub']
    data = request.get_json()
    biz_no = data.get('business_registration_no')
    result, status_code = auth_service.verify_business_number(user_id, biz_no)
    return jsonify(result), status_code

@auth_bp.post('/upload-verification-doc')
@require_auth
def upload_verification_doc():
    user_id = request.user['sub']
    result, status_code = auth_service.upload_verification_doc(user_id)
    return jsonify(result), status_code
