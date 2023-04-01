from flask import Flask, request, jsonify
import openai
import os

from openai import InvalidRequestError

app = Flask(__name__)

@app.route('/quickChat', methods=['POST'])
def chat():
    input = request.json['input']
    openai.api_key = os.getenv("OPENAI_API_KEY")
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": input}]
    )

    response = {
        "role": completion.choices[0].message.role,
        "content": completion.choices[0].message.content.replace("\n", ""),
        "tokens": completion.usage.total_tokens
    }

    return jsonify(response)


@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        print("here")
        audio_file = request.files['file']
        print("file:", audio_file)
    except Exception as e:
        print("Error reading request data:", e)

    openai.api_key = os.getenv("OPENAI_API_KEY")
    transcript = openai.Audio.transcribe("whisper-1", audio_file, lang="de")

    response = {
        "transcript": transcript
    }

    return jsonify(response)



if __name__ == '__main__':
    app.run()
