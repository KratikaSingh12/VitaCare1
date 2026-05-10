from flask import Flask, request, jsonify
import pickle
import numpy as np
import re
from difflib import get_close_matches

app = Flask(__name__)

# Load model
model = pickle.load(open("model.pkl", "rb"))
tfidf = pickle.load(open("tfidf.pkl", "rb"))

VOCAB = set(tfidf.get_feature_names_out())

# ---------------- Smart Correction ----------------
def smart_correct_text(text, vocab=VOCAB, cutoff=0.80):

    text = text.lower().strip()

    words = re.findall(r"[a-zA-Z]+", text)

    corrected_words = []

    for w in words:
        if w in vocab:
            corrected_words.append(w)
        else:
            match = get_close_matches(w, vocab, n=1, cutoff=cutoff)
            corrected_words.append(match[0] if match else w)

    return " ".join(corrected_words)

# ---------------- Prediction API ----------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.json
    symptom = data["symptom"]

    corrected_text = smart_correct_text(symptom)

    vec = tfidf.transform([corrected_text])

    probs = model.predict_proba(vec)[0]
    classes = model.classes_

    best_idx = np.argmax(probs)

    result = {
        "department": classes[best_idx],
        "confidence": float(probs[best_idx]),
        "corrected_input": corrected_text
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=8000)