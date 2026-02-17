from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "the backend is alive"}

app.add_middleware(
    CORSMiddleware,
    allow_origins =["*"],
    allow_credentials = True,
    allow_methods =["*"],
    allow_headers =["*"]
)

class Message(BaseModel):
    message: str

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/chat")
async def chat(message: Message):
    client = openai.OpenAI() # Uses OPENAI_API_KEY from .env automatically
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": message.message}
            ],
            max_tokens=100
        )
        return {"reply": response.choices[0].message.content.strip()}
    except openai.RateLimitError:
        return {"error": "You have run out of API credits. Check your OpenAI billing dashboard."}
