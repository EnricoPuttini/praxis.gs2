import requests
import json 
import os                     
from dotenv import load_dotenv 


load_dotenv() 


RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = "jsearch.p.rapidapi.com"
URL_API = "https://jsearch.p.rapidapi.com/search"


if not RAPIDAPI_KEY:
    print("ERRO CRÍTICO: Chave RAPIDAPI_KEY não encontrada.")
    print("Verifique se você criou o arquivo .env na pasta /back-end/.")
    exit() 

def obter_tendencias_emprego(query: str) -> list[dict]:
    print(f"Buscando na API por: '{query}'...")
    querystring = {
        "query": query,
        "country": "br", 
        "page": "1"
    } 
    
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY, 
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    
    try:
        response = requests.get(URL_API, headers=headers, params=querystring, timeout=10)
        response.raise_for_status() 
        
        dados_json = response.json()
        lista_de_empregos = dados_json.get('data', []) 
        
        if not lista_de_empregos:
            print("API não retornou dados para esta busca.")
            return []
            
        print(f"Sucesso! {len(lista_de_empregos)} resultados encontrados.")
        return lista_de_empregos

    except requests.exceptions.HTTPError as err_http:
        print(f"Erro HTTP: {err_http}. Se for 401, sua chave API está errada ou expirou.")
    except Exception as err:
        print(f"Um erro inesperado ocorreu: {err}")
        
    return [] 

def filtrar_profissoes(profissoes: list[dict]) -> list[dict]:
    PALAVRAS_CHAVE_PROMISSORAS = ["automação", "iot", "segurança", "scanner", "operador", "logística", "robótica"]
    
    profissoes_filtradas = []
    
    if not profissoes:
        return []

    for profissao in profissoes:
        descricao = profissao.get('job_description', '').lower()
        titulo = profissao.get('job_title', '').lower()
        
        if any(palavra in descricao or palavra in titulo for palavra in PALAVRAS_CHAVE_PROMISSORAS):
            profissoes_filtradas.append(profissao)
            
    print(f"Filtramos {len(profissoes)} para {len(profissoes_filtradas)} profissões relevantes.")
    return profissoes_filtradas

def calcular_crescimento_total(profissoes: list[dict]) -> float:
    if not profissoes:
        return 0
    
    primeira_profissao = profissoes[0]
    resto_da_lista = profissoes[1:]
    taxa_simulada = 1.0 if primeira_profissao.get('job_is_remote', False) else 0.5

    return taxa_simulada + calcular_crescimento_total(resto_da_lista)

def exibir_profissoes(profissoes: list[dict]):
 
    if not profissoes:
        print("\nNenhuma profissão relevante para exibir.")
        return

    print("\n--- PROFISSÕES RELEVANTES (PARA LOGÍSTICA 4.0) ---")
    
    for i, profissao in enumerate(profissoes, start=1):
        titulo = profissao.get('job_title', 'Sem Título')
        empresa = profissao.get('employer_name', 'Empresa Confidencial')
        local = profissao.get('job_city', 'Remoto') + ", " + profissao.get('job_country', 'BR')
        
        print(f"\n{i}. {titulo}")
        print(f"   Empresa: {empresa}")
        print(f"   Local: {local}")
        
    print("-----------------------------------------")

def main():
    termo_de_busca = "Operador de Logística automação em São Paulo"
    
    dados_brutos = obter_tendencias_emprego(termo_de_busca)
    
    if dados_brutos:
        profissoes_filtradas = filtrar_profissoes(dados_brutos)
        exibir_profissoes(profissoes_filtradas)
        soma_taxas = calcular_crescimento_total(profissoes_filtradas)
        print(f"\nÍndice de Crescimento Simulado (Recursivo): {soma_taxas:.2f}")
    else:
        print("Não foi possível obter os dados da API. Verifique sua chave ou conexão.")

if __name__ == "__main__":
    main()