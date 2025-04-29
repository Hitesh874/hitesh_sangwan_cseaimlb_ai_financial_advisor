from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import yfinance as yf
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Setup Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Request body model


class FinanceRequest(BaseModel):
    salary: int
    expenses: int

# Function to get advice


def get_financial_advice(salary, expenses):
    model = genai.GenerativeModel('gemini-1.5-pro')
    prompt = f"""
    You are a smart personal finance advisor for middle-class people in India.

    A person earns ₹{salary} per month and has ₹{expenses} monthly expenses.

    Suggest:
    - How much to save
    - How much to invest in mutual funds
    - How much to keep in savings
    - Other smart investment ideas (FD, gold, PPF, etc.)

    Keep advice simple, practical, and friendly.
    """
    response = model.generate_content(prompt)
    return response.text

# Function to get optional stock price (example)


def get_stock_price(symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period="7d")
    latest_price = data['Close'][-1]
    return float(latest_price)

# API Route - POST (Main)


@app.post("/api/finance-advice")
async def finance_advice(request: FinanceRequest):
    try:
        advice = get_financial_advice(request.salary, request.expenses)
        reliance_price = get_stock_price('RELIANCE.NS')  # Example stock

        return {
            "advice": advice,
            "example_stock": {
                "name": "Reliance Industries",
                "price": reliance_price
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Added: Simple GET route for testing


@app.get("/")
def root():
    return {"message": "Server is running! FastAPI + Gemini AI + YFinance connected 🚀"}
