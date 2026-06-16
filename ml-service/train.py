import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neural_network import MLPClassifier

# Load dataset
df = pd.read_csv("dataset.csv")

X = df["symptoms"]
y = df["department"]

# Train TF-IDF
tfidf = TfidfVectorizer()
X_vec = tfidf.fit_transform(X)

# Train Model
model = MLPClassifier(max_iter=500, random_state=42)
model.fit(X_vec, y)

# Save
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(tfidf, open("tfidf.pkl", "wb"))

print("✅ Model trained and saved!")