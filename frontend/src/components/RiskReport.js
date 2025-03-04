function RiskReport({ data }) {
    if (!data) return null;

    return (
        <div className="mt-5 p-5 border rounded shadow-md">
            <h2 className="text-xl font-bold">{data.ticker} - Risk Analysis</h2>
            <p><strong>Current Price:</strong> ${data.risk_report.current_price}</p>
            <p><strong>50-Day Moving Avg:</strong> ${data.risk_report.moving_avg_50}</p>
            <p><strong>Trend:</strong> {data.risk_report.trend}</p>
            <p><strong>Volatility:</strong> {data.risk_report.volatility}%</p>
            <p><strong>Sentiment Score:</strong> {data.sentiment_score}</p>
        </div>
    );
}

export default RiskReport;
