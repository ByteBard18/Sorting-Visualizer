from flask import Flask, request, jsonify
from flask_cors import CORS
from sorting_algorithms import get_merge_sort_animations, get_bubble_sort_animations

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3001"}})  # Allowing CORS for specific origin

@app.route('/', methods=['GET'])  # Endpoint for testing
def index():
    return 'Hello World!'

@app.route('/merge-sort', methods=['POST'])  # Endpoint for merge sort
def merge_sort():
    data = request.get_json()
    array = data.get('array')
    
    animations = get_merge_sort_animations(array)
    
    return jsonify({'animations': animations})

@app.route('/bubble-sort', methods=['POST'])  # Endpoint for bubble sort
def bubble_sort():
    data = request.get_json()
    array = data.get('array')
    
    animations = get_bubble_sort_animations(array)
    
    return jsonify({'animations': animations})

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
