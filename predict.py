import pickle
import pandas as pd

# Load trained model
with open("fake_detector.pkl", "rb") as file:
    model = pickle.load(file)

def predict_fake_account(features):
    # Convert input to DataFrame
    df = pd.DataFrame([features])

    # Convert categorical fields
    df["profile_picture"] = df["profile_picture"].astype(int)  # 1 = Yes, 0 = No
    df["bio_complete"] = df["bio_complete"].astype(int)  # 1 = Yes, 0 = No

    # Make prediction (0 = Real, 1 = Fake)
    prediction = model.predict(df)[0]
    
    return "Fake Account" if prediction == 1 else "Real Account"

# Example usage
if __name__ == "__main__":
    sample_data = {
        "num_followers": 100,
        "num_following": 500,
        "num_posts": 2,
        "engagement_rate": 0.01,
        "account_age_days": 365,
        "profile_picture": 1,  # 1 = Yes, 0 = No
        "bio_complete": 1  # 1 = Yes, 0 = No
    }
    result = predict_fake_account(sample_data)
    print("Prediction:", result)
