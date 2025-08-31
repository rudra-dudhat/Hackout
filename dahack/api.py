import pickle
import threading
import time
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from twilio.rest import Client

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# Twilio config (replace with your credentials)
TWILIO_SID = 'your_twilio_sid'
TWILIO_AUTH_TOKEN = 'your_twilio_auth_token'
TWILIO_PHONE = 'your_twilio_phone_number'
client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    mobile = db.Column(db.String(20), unique=True, nullable=False)

with app.app_context():
    db.create_all()

# ------------------- Pickle loading fix -------------------
try:
    with open('da hack/model.pkl', 'rb') as f:
        # Use encoding='bytes' for Python 2 -> 3 compatibility
        model = pickle.load(f, encoding='bytes')
except Exception as e:
    print("Error loading model:", e)
    model = None  # Avoid crashing, but API won't work without model
# -----------------------------------------------------------

def send_sms(mobile, message):
    try:
        client.messages.create(
            body=message,
            from_=TWILIO_PHONE,
            to=mobile
        )
    except Exception as e:
        print("SMS sending failed:", e)

def get_alert_level(pred):
    # Example: adjust according to your model's prediction range
    if pred < 0.3:
        return "Safe", "No alert"
    elif pred < 0.7:
        return "Warning", "Be cautious"
    else:
        return "Danger", "Evacuate immediately"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if User.query.filter(
        (User.email == data['email']) | 
        (User.username == data['username']) | 
        (User.mobile == data['mobile'])
    ).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_pw = generate_password_hash(data['password'])
    user = User(
        email=data['email'], 
        username=data['username'], 
        password=hashed_pw, 
        mobile=data['mobile']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful', 'mobile': user.mobile, 'username': user.username})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'message': 'Model not loaded'}), 500

    data = request.json
    features = data['features']
    user_mobile = data['mobile']
    try:
        pred = model.predict([features])[0]
        level, alert_msg = get_alert_level(pred)
        risk_level = float(pred) * 100  # Add this line for percentage
        send_sms(user_mobile, f"Prediction: {level}. {alert_msg}")
        return jsonify({
            'prediction': float(pred),
            'risk_level': risk_level,  # Add this line
            'level': level,
            'alert': alert_msg
        })
    except Exception as e:
        return jsonify({'message': 'Prediction error', 'error': str(e)}), 500

# --- Showcase logic ---
showcase_data = {
    "input": None,
    "prediction": None,
    "level": None,
    "alert": None
}

def showcase_predictor():
    csv_path = 'da hack/dataset/synthetic_100_rows.csv'
    try:
        df = pd.read_csv(csv_path)
    except Exception as e:
        print("CSV read error:", e)
        return
    idx = 0
    while True:
        row = df.iloc[idx % len(df)]
        features = row.values.tolist()
        if model is not None:
            try:
                pred = model.predict([features])[0]
                level, alert_msg = get_alert_level(pred)
                showcase_data["input"] = features
                showcase_data["prediction"] = float(pred)
                showcase_data["level"] = level
                showcase_data["alert"] = alert_msg
            except Exception as e:
                print("Showcase prediction error:", e)
        idx += 1
        time.sleep(15)

@app.route('/showcase', methods=['GET'])
def get_showcase():
    return jsonify(showcase_data)

# Start showcase thread
threading.Thread(target=showcase_predictor, daemon=True).start()

@app.route('/')
def index():
    return "SAGAR SAATHI Flask API is running."


if __name__ == '__main__':
    app.run(port=5000, debug=True)