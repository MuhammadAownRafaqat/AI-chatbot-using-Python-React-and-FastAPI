# AI Chatbot

A full-stack AI chatbot using React and FastAPI, powered by OpenAI's GPT-3.5 Turbo. Watch this video for guidance: https://youtu.be/sIJT8y8xtvA

## Project Structure

```
ai_chatbot/
├── main.py              # FastAPI backend
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not tracked by git)
├── chatbot-ui/          # React frontend
│   ├── src/
│   │   ├── App.js       # Main chat component
│   │   └── App.css      # Styles
│   └── package.json
└── README.md
```

## Setup

### 1. Backend

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Add your OpenAI API key to `.env`:

```
OPENAI_API_KEY=your_key_here
```

Start the backend:

```bash
uvicorn main:app --reload
```

### 2. Frontend

```bash
cd chatbot-ui
npm install
npm start
```

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:8000`.

## Usage

Type a message in the chat box and press Send. The message is sent to the FastAPI backend, which forwards it to OpenAI's GPT-3.5 Turbo and returns the response.
