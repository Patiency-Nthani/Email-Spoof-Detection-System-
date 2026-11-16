import re

def analyze_email_headers(raw_headers: str):
    risk_score = 0
    findings = []
    
    # Extract Sender
    sender_match = re.search(r"From:\s*(?:[^<]+\s*)?<?([^>]+)>?", raw_headers, re.IGNORECASE)
    sender_address = sender_match.group(1).strip() if sender_match else "unknown@domain.com"
    
    # Extract Subject
    subject_match = re.search(r"Subject:\s*(.+)", raw_headers, re.IGNORECASE)
    subject = subject_match.group(1).strip() if subject_match else "No Subject"

    # Rule checks based on user spec weights
    headers_lower = raw_headers.lower()
    
    if "spf=fail" in headers_lower:
        risk_score += 25
        findings.append("spfFail")
    if "dkim=fail" in headers_lower:
        risk_score += 20
        findings.append("dkimFail")
    if "dmarc=fail" in headers_lower:
        risk_score += 30
        findings.append("dmarcFail")
        
    # Check suspicious domain spoofing or lookalikes (e.g. paypa1)
    if re.search(r"paypa1|amzon|g00gle|micros0ft", sender_address, re.IGNORECASE):
        risk_score += 35
        findings.append("lookalike")
        
    # Cap risk score at 100
    risk_score = min(risk_score, 100)
    
    # Determine verdict based on risk bands
    if risk_score >= 80:
        verdict = "Critical"
    elif risk_score >= 60:
        verdict = "High"
    elif risk_score >= 30:
        verdict = "Suspicious"
    else:
        verdict = "Low"

    return {
        "sender_address": sender_address,
        "subject": subject,
        "risk_score": risk_score,
        "verdict": verdict,
        "findings": findings
    }