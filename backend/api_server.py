from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

print("Carregando o servidor de simulação (com IA)...")
load_dotenv()

app = Flask(__name__)
CORS(app) 

DATABASE_FILE = 'database.json'


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("ERRO CRÍTICO: 'GEMINI_API_KEY' não encontrada no .env.")
    print("O servidor não pode iniciar a IA.")


try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('models/gemini-flash-latest')
    print("IA do Gemini configurada e pronta (modelo: gemini-flash-latest).")
except Exception as e:
    print(f"ERRO ao configurar a IA: {e}")
    model = None 
@app.route('/api/operators', methods=['GET'])
def get_operators():
    try:
        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- 4. O NOVO ENDPOINT "INTELIGENTE" (A Mágica) ---
# Ele substitui o antigo "/api/simulate_skill"
@app.route('/api/mentor_chat', methods=['POST'])
def mentor_chat():
    if not model:
        return jsonify({"error": "O modelo de IA não está configurado."}), 500

    try:
        user_response = request.json['response']
        user_id = int(request.json['user_id']) 

        print(f"Recebida resposta do usuário {user_id}: '{user_response}'")

        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            operators = json.load(f)

        target_operator = None
        for op in operators:
            if op['id'] == user_id:
                target_operator = op
                break
        
        if not target_operator:
            return jsonify({"error": "Operador não encontrado"}), 404

        conversation_history = target_operator.get('log_mentor_ia', []) 
        conversation_history.append({"role": "user", "text": user_response}) 

        prompt = (
            "Você é o 'Mentor de Posto', um mentor de IA para trabalhadores de chão de fábrica. "
            "Seu objetivo é ensinar a 'Norma de Segurança SK-103' para o trainee Roberto. "
            "Seja claro, objetivo e encorajador (máx 2 frases). Termine suas respostas com uma pergunta ou um 'entendido?'. "
            "Se o usuário disser 'entendido', 'sim' ou 'pronto', responda com 'Parabéns!' e marque o treino como completo."
            "\n--- HISTÓRICO DA CONVERSA ---\n"
        )

        for message in conversation_history:
            prompt += f"{message['role']}: {message['text']}\n"
        
        prompt += "mentor: " 

        print("Chamando a IA do Gemini...")
        ai_response = model.generate_content(prompt)
        ai_response_text = ai_response.text.strip()
        print(f"Resposta da IA: {ai_response_text}")

        conversation_history.append({"role": "mentor", "text": ai_response_text})
        
        if "parabéns" in ai_response_text.lower():
            print("Treinamento concluído! Atualizando skill.")
            target_operator['alertas_pendentes'] = 0
            target_operator['habilidades_adquiridas'].append({
                "nome": "Segurança SK-103 (Concluído por IA)",
                "data_aquisicao": "2025-11-13" # (Data de hoje)
            })

        with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
            json.dump(operators, f, indent=2, ensure_ascii=False)
            
        return jsonify({"success": True, "new_chat_log": conversation_history}), 200

    except Exception as e:
        print(f"ERRO no endpoint /api/mentor_chat: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)