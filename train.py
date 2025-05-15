import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd 


# Load dataset
df = pd.read_csv("C:/Users/CHETHAK SANIL/OneDrive/Desktop/Fake_account_detect/backend/model/dataset.csv")

# Define features and labels
X = df.drop(columns=["is_fake"])
y = df["is_fake"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model correctly
MODEL_PATH = "C:/Users/CHETHAK SANIL/OneDrive/Desktop/Fake_account_detect/backend/model/fake_detector.pkl"

with open(MODEL_PATH, "wb") as file:
    pickle.dump(model, file)

print(f"✅ Model trained and saved successfully at {MODEL_PATH}!")