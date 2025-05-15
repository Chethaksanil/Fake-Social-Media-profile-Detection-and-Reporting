import pickle
import pandas as pd

model_path = "backend/model/fake_detector.pkl"

# Load model
with open(model_path, "rb") as file:
    model = pickle.load(file)

print(f"✅ Model loaded: {type(model)}")

# Sample input
data = {
    "num_followers": 500,
    "num_following": 100,
    "num_posts": 20,
    "engagement_rate": 3.5,
    "account_age_days": 730,
    "profile_picture": 1,
    "bio_complete": 0
}

df = pd.DataFrame([data])
print("🔍 Checking model prediction...")

try:
    prediction = model.predict(df)
    print(f"✅ Prediction: {prediction}")
except Exception as e:
    print(f"❌ Model prediction error: {e}")
