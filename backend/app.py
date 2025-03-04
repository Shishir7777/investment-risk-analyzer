from flask import Flask, request, jsonify
from flask_cors import CORS  
from risk_analysis import analyze_risk
from sentiment_analysis import get_sentiment

app = Flask(__name__)

# ✅ Explicitly allow frontend requests
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route('/')
def home():
    return "Investment Risk Analyzer API is running!"

@app.route('/analyze', methods=['GET', 'OPTIONS'])
def analyze():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    ticker = request.args.get('ticker')
    
    if not ticker:
        return jsonify({"error": "Stock ticker is required"}), 400

    risk_report = analyze_risk(ticker)
    sentiment_score = get_sentiment(ticker)

    response = jsonify({
        "ticker": ticker.upper(),
        "risk_report": risk_report,
        "sentiment_score": sentiment_score
    })

    return _build_cors_response(response)

# ✅ Handle OPTIONS Preflight Requests
def _build_cors_preflight_response():
    response = jsonify({"message": "CORS preflight success"})
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# ✅ Attach CORS headers to actual API responses
def _build_cors_response(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
