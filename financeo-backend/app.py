from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

@app.route('/quickChat', methods=['POST'])
def chat():
    input = request.json['input']
    openai.api_key = os.getenv("OPENAI_API_KEY")
    completion = openai.ChatCompletion.create(
        model="gpt-3.5",
        messages=[{"role": "user", "content": input}]
    )
    print(completion)
    response = {
        "role": completion.choices[0].message.role,
        "content": completion.choices[0].message.content.replace("\n", ""),
        "tokens": completion.usage.total_tokens
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run()
