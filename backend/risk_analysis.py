import yfinance as yf
import numpy as np

def analyze_risk(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="6mo")  # Get last 6 months of data

    if hist.empty:
        return {"error": "Stock data not found"}

    close_prices = hist['Close']

    # Fix: Ensure we are calculating daily % change, not absolute change
    daily_returns = close_prices.pct_change().dropna()
    volatility = np.std(daily_returns) * 100  # Convert to percentage

    # Trend Analysis: Compare latest price with 50-day moving average
    moving_avg_50 = close_prices.rolling(50).mean().iloc[-1]
    current_price = close_prices.iloc[-1]
    trend = "Bullish" if current_price > moving_avg_50 else "Bearish"

    return {
        "volatility": round(volatility, 2),  # Now in a correct range
        "trend": trend,
        "current_price": round(current_price, 2),
        "moving_avg_50": round(moving_avg_50, 2)
    }
