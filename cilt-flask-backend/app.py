from flask import Flask, request, jsonify
import torch
import torchvision.transforms as transforms
from PIL import Image
from torchvision import models
import torch.nn as nn
import openai


app = Flask(__name__)


openai.api_key = "sk-"


device = torch.device("cpu")
model = models.mobilenet_v2(pretrained=False)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, 5)
model.load_state_dict(torch.load("mobilenet_cilt_model.pt", map_location=device))
model.eval()


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])


class_names = ['bkl', 'nv', 'mel', 'bcc', 'akiec']


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'Görsel dosyası eksik'}), 400

    image = Image.open(request.files['image']).convert("RGB")
    image_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs.data, 1)
        result = class_names[predicted.item()]

    return jsonify({'result': result})


@app.route('/ask', methods=['POST'])
def ask_bot():
    data = request.get_json()
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({'error': 'Mesaj boş olamaz'}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen bir cilt hastalıkları danışmanısın."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=200
        )
        answer = response['choices'][0]['message']['content']
        return jsonify({'reply': answer})
    except Exception as e:
        print("OpenAI HATASI:", e)  # 🧠 loglama
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
