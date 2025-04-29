# AI Financial Advisor

## Team Members
- Ankush Sangwan — 2401730201
- Hitesh Sangwan — 2401730218

## Project Description
AI Financial Advisor is a full-stack web application that provides users with real-time stock market data and financial analysis. The app is designed to support smarter financial decision-making using real-time data from the stock market through the YFinance API. The backend is built with **FastAPI** to ensure high performance and asynchronous capabilities, while the frontend uses **Next.js** with **Tailwind CSS** for a modern and responsive UI.

---

## 📹 Project Video Explanation
[Watch the Project Video](https://github.com/YourUsername/YourRepoName/assets/your-video.mp4)  
*Replace the link with the actual path to your video in the repository.*

---

## 🧰 Technologies Used
- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: FastAPI (Python)
- **API/Data Source**: YFinance (Yahoo Finance API)
- **Other Tools**: GitHub, VS Code

---

## 🚀 Steps to Run/Execute the Project

### 📦 Prerequisites
- Node.js and npm installed
- Python 3.8 or higher
- Git

---

### 🔧 Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
