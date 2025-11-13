from flask import Flask, jsonify, request
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app) 

DATABASE_FILE = 'database.json'

@app.route('/api/operators', methods=['GET'])
def get_operators():
    try:
        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/simulate_skill', methods=['POST'])
def simulate_skill():
    try:
        # 1. Leia o banco de dados
        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            operators = json.load(f)


        for op in operators:
            if op['id'] == 6: 
                print("Simulando aprendizado para 'Roberto Santos'...")
                op['alertas_pendentes'] = 0
                op['habilidades_adquiridas'].append({
                    "nome": "Segurança SK-103 (Simulado)",
                    "data_aquisicao": "2025-11-13" #
                })
                print("Simulação concluída.")
                break
        
        with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
            json.dump(operators, f, indent=2, ensure_ascii=False)
            
        return jsonify({"success": True, "message": "Habilidade simulada para Roberto Santos"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)