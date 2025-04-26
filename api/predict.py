import pickle
import numpy as np
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            params = parse_qs(post_data.decode('utf-8'))
            
            input_order = [
                'Power', 'Velocity', 'density', 'Cp', 'k', 'melting T',
                'Y (wt%)', 'Zn (wt%)', 'Mg (wt%)', 'Si (wt%)', 'Al (wt%)',
                'Sn (wt%)', 'Zr (wt%)', 'W (wt%)', 'Ti (wt%)', 'V (wt%)',
                'Co (wt%)', 'Cu (wt%)', 'Ta (wt%)', 'Nb (wt%)', 'Ni (wt.%)',
                'Cr (wt.%)', 'Fe (wt.%)', 'Mn (wt%)', 'Mo (wt.%)'
            ]
            
            input_values = [float(params[key][0]) for key in input_order]
            prediction = model.predict([input_values])[0]
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(f'{{"prediction": {prediction}}}'.encode())
            
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())