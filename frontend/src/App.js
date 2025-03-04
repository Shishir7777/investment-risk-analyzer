import React, { useState } from "react";
import axios from "axios";

function App() {
  const [ticker, setTicker] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    try {
      setError("");
      const response = await axios.get(`http://127.0.0.1:5000/analyze?ticker=${ticker}`);(
 {
        headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Fix CORS issues
      });
      setResult(response.data);
    } catch (err) {
      setError("Error fetching data. Please check the ticker or try again later.");
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Investment Risk Analyzer</h1>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker (e.g., TSLA)"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleAnalyze} style={{ padding: "8px" }}>Analyze</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && result.risk_report && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <h2>Analysis for {result.ticker}</h2>
          <p><strong>Current Price:</strong> ${result.risk_report.current_price}</p>
          <p><strong>50-Day Moving Average:</strong> ${result.risk_report.moving_avg_50}</p>
          <p><strong>Trend:</strong> {result.risk_report.trend}</p>
          <p><strong>Volatility:</strong> {result.risk_report.volatility}</p>
          <p><strong>Sentiment Score:</strong> {result.sentiment_score}</p>
        </div>
      )}
    </div>
  );
}

export default App;
