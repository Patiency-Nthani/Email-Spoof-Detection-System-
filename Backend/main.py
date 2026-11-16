from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import init_db, get_db, hash_password
from analyzer import analyze_email_headers

app = FastAPI(title="Email Spoof Detection System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

class SignupRequest(BaseModel):
    full_name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class AnalysisRequest(BaseModel):
    raw_headers: str
    user_id: int

@app.post("/api/auth/signup")
def signup(payload: SignupRequest):
    conn = get_db()
    cursor = conn.cursor()
    try:
        hashed = hash_password(payload.password)
        cursor.execute("INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)", 
                       (payload.full_name, payload.email, hashed))
        conn.commit()
        user_id = cursor.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    finally:
        conn.close()
    
    return {"user": {"id": user_id, "email": payload.email, "full_name": payload.full_name}}

@app.post("/api/auth/login")
def login(payload: LoginRequest):
    conn = get_db()
    cursor = conn.cursor()
    hashed = hash_password(payload.password)
    cursor.execute("SELECT id, full_name, email FROM users WHERE email = ? AND password_hash = ?", 
                   (payload.email, hashed))
    user = cursor.fetchone()
    conn.close()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    return {"user": {"id": user["id"], "email": user["email"], "full_name": user["full_name"]}}

@app.post("/api/analyses")
def create_analysis(payload: AnalysisRequest):
    result = analyze_email_headers(payload.raw_headers)
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO analyses (user_id, raw_headers, sender_address, subject, risk_score, verdict)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (payload.user_id, payload.raw_headers, result["sender_address"], result["subject"], result["risk_score"], result["verdict"]))
    conn.commit()
    analysis_id = cursor.lastrowid
    conn.close()
    
    return {**result, "id": analysis_id}

@app.get("/api/analyses")
def get_analyses():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, sender_address, subject, risk_score, verdict, created_at FROM analyses ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]