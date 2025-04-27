from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        input_params = [
            data['Power'],
            data['Velocity'],
            data['density'],
            data['Cp'],
            data['k'],
            data['melting T'],
            data['Y (wt%)'],
            data['Zn (wt%)'],
            data['Mg (wt%)'],
            data['Si (wt%)'],
            data['Al (wt%)'],
            data['Sn (wt%)'],
            data['Zr (wt%)'],
            data['W (wt%)'],
            data['Ti (wt%)'],
            data['V (wt%)'],
            data['Co (wt%)'],
            data['Cu (wt%)'],
            data['Ta (wt%)'],
            data['Nb (wt%)'],
            data['Ni (wt.%)'],
            data['Cr (wt.%)'],
            data['Fe (wt.%)'],
            data['Mn (wt%)'],
            data['Mo (wt.%)'],
            data['ohe_sub'],
            data['ohe_mat'],
        ]
        
        prediction = model.predict([input_params])
        return jsonify({'prediction': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)