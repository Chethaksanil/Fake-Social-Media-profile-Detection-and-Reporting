import os
import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load ML model
MODEL_PATH = "model/fake_detector.pkl"


if os.path.exists(MODEL_PATH):
    print(f"✅ Model found at {MODEL_PATH}, attempting to load...")
    try:
        with open(MODEL_PATH, "rb") as file:
            model = pickle.load(file)
        print(f"✅ Model loaded successfully! Model type: {type(model)}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None
else:
    print("❌ Model file not found!")
    model = None

@app.route("/")
def home():
    return "✅ Fake Social Media Account Detection API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "❌ Model not loaded or invalid"}), 500  

    try:
        data = request.json
        df = pd.DataFrame([data])

        # Ensure correct types
        df["profile_picture"] = df["profile_picture"].astype(int)
        df["bio_complete"] = df["bio_complete"].astype(int)

        prediction = model.predict(df)[0]
        result = "Fake Account" if prediction == 1 else "Real Account"
        
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
