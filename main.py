from flask import Flask, request, render_template, jsonify
from transcriber import transcribe_audio
from summarizer import summarize_text
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/process-audio", methods=["POST"])
def process_audio():
    audio = request.files["audio"]
    audio.save("temp.wav")

    try:
        transcription = transcribe_audio("temp.wav")
        summary = summarize_text(transcription)
        return jsonify({"transcription": transcription, "summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists("temp.wav"):
            os.remove("temp.wav")

if __name__ == "__main__":
    app.run(debug=True, port=5050)
