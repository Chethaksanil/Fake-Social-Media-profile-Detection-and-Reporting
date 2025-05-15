from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)

# Secret key for encoding JWT tokens
app.config['SECRET_KEY'] = 'your_secret_key_here'

# Simulating a user database (in practice, this should be connected to a real database)
users_db = {
    "admin": generate_password_hash("adminpassword"),
    "user": generate_password_hash("userpassword")
}

# Helper function to create JWT tokens
def create_token(username):
    payload = {
        "sub": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expiry in 1 hour
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

# Login route to authenticate users and provide JWT token
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in users_db and check_password_hash(users_db[username], password):
        token = create_token(username)
        return jsonify({"message": "Login successful", "token": token})
    return jsonify({"message": "Invalid credentials"}), 401

# Example route that requires authentication
@app.route("/protected", methods=["GET"])
def protected():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({"message": "Token is missing!"}), 403
    
    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        username = decoded_token["sub"]
        return jsonify({"message": f"Welcome {username}!"})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 403

if __name__ == "__main__":
    app.run(debug=True)
