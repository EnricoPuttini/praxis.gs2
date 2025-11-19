# 🚀 PRAXIS: Mentor de Posto com IA e Gestão Inteligente

## 📖 Resumo do Projeto

O PRAXIS é uma plataforma inovadora que integra Inteligência Artificial (IA) e Edge Computing para otimizar a gestão de equipes e a capacitação contínua no ambiente industrial. A solução visa criar um "Mentor de Posto de Trabalho" inteligente que oferece suporte e treinamento personalizado aos operadores diretamente no chão de fábrica, enquanto fornece aos gestores uma visibilidade em tempo real sobre o progresso e as necessidades de aprendizado de suas equipes.

**Objetivos principais:**
* Reduzir acidentes de trabalho através de treinamento de segurança eficaz e personalizado.
* Aumentar a produtividade e a eficiência operacional.
* Promover a requalificação (reskilling) e o aprimoramento (upskilling) da força de trabalho.
* Oferecer uma gestão proativa baseada em dados sobre o desenvolvimento do capital humano.

O projeto aborda desafios do **Futuro do Trabalho**, como a disrupção tecnológica e a necessidade de aprendizado contínuo, alinhando-se aos **Objetivos de Desenvolvimento Sustentável (ODS) 3, 4, 8 e 9** da ONU.

## 👥 Usuários de Demonstração

              
**Nota:** Este protótipo não possui um sistema de autenticação de usuário no Front-End. O acesso aos dados é direto via a interface do dashboard (`localhost:3000`). O ID `6` (Roberto Santos) é o operador principal para as simulações do Mentor de IA.

## 🛠️ Instalação do Projeto (Passo a Passo)

Para instalar e rodar o projeto PRAXIS, você precisará do Node.js/npm (para o Front-End) e Python (para o Back-End).

### Pré-requisitos

* **Node.js** (versão 18.x ou superior) e **npm** (gerenciador de pacotes do Node.js)
* **Python** (versão 3.9 ou superior)
* **Git** (para clonar o repositório)

### Etapas de Instalação e Execução

Siga os passos abaixo na ordem para configurar e iniciar todas as partes da aplicação:

#### 1. Clonar o Repositório

Abra seu terminal ou prompt de comando e execute:

```bash
git clone [LINK_DO_SEU_REPOSITORIO_GITHUB]
cd praxis-project # Ou o nome da pasta do seu projeto

## 2. Configurar o Back-End (Python)

Navegue até o diretório do Back-End. Assumimos que o Back-End está em
uma pasta como `backend/` ou `api/` dentro do seu repositório principal.

``` bash
cd backend/   # Ajuste o caminho se necessário
```

### a. Criar e Ativar Ambiente Virtual (Recomendado)

``` bash
python -m venv venv
```

**Windows**

``` bash
.env\Scriptsctivate
```

**macOS / Linux**

``` bash
source venv/bin/activate
```

### b. Instalar Dependências

``` bash
pip install -r requirements.txt
```

Se não houver `requirements.txt`, instale manualmente:

``` bash
pip install Flask python-dotenv google-generativeai paho-mqtt
```

### c. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta do Back-End e adicione sua chave de API
do Google Gemini:

``` env
# .env
GEMINI_API_KEY="SUA_CHAVE_DE_API_DO_GOOGLE_GEMINI_AQUI"
```

### d. Iniciar o Servidor Back-End

``` bash
python api_server.py
```

O servidor Back-End estará rodando em:\
`http://localhost:5000`

------------------------------------------------------------------------

## 3. Configurar o Front-End (Next.js/React)

``` bash
cd frontend/
```

### a. Instalar Dependências

``` bash
npm install
```

### b. Iniciar o Servidor Front-End

``` bash
npm run dev
```

Front-End acessível em:\
`http://localhost:3000`

Chat com IA acessível em:\
`http://localhost:3000/mentor/6`


## 🔗 Repositório

\[https://github.com/EnricoPuttini/praxis.gs2.git\]

------------------------------------------------------------------------

## 👥 Integrantes

-   **\[Enrico Puttini\]** --- RM: **\[561400\]**\
-   **\[Jean Carlos\]** --- RM: **\[566439\]**\
