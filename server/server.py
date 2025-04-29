from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

with open('model.pkl', 'rb') as f:
    model_1 = pickle.load(f)

with open('model1.pkl', 'rb') as f:
    model_2 = pickle.load(f)

with open('model2.pkl', 'rb') as f:
    model_3 = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Input validation
        required_fields = ['Power', 'Velocity', 'density', 'Cp', 'k', 'melting T',
                          'Y (wt%)', 'Zn (wt%)', 'Mg (wt%)', 'Si (wt%)', 'Al (wt%)',
                          'Sn (wt%)', 'Zr (wt%)', 'W (wt%)', 'Ti (wt%)', 'V (wt%)',
                          'Co (wt%)', 'Cu (wt%)', 'Ta (wt%)', 'Nb (wt%)', 'Ni (wt.%)',
                          'Cr (wt.%)', 'Fe (wt.%)', 'Mn (wt%)', 'Mo (wt.%)', 'ohe_sub', 'ohe_mat']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
            if not isinstance(data[field], (int, float)):
                return jsonify({'error': f'Invalid type for {field}'}), 400

        input_params = [data[field] for field in required_fields]
        
        # Get predictions
        length_pred = float(model_1.predict([input_params])[0])
        depth_pred = float(model_2.predict([input_params])[0])
        width_pred = float(model_3.predict([input_params])[0])
        
        print(f"Predictions - Length: {length_pred}, Depth: {depth_pred}, Width: {width_pred}")
        
        return jsonify({
            'Length': length_pred,
            'Depth': depth_pred,
            'Width': width_pred
        })
    
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000)