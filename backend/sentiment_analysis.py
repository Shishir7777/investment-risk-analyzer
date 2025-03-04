import feedparser
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download VADER lexicon if not already downloaded
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

def get_sentiment(ticker):
    url = f"https://news.google.com/rss/search?q={ticker}+stock"
    feed = feedparser.parse(url)

    if not feed.entries:
        return {"error": "No news found"}

    # Extract top 5 headlines
    headlines = [entry.title for entry in feed.entries[:5]]
    sentiment_scores = [sia.polarity_scores(headline)["compound"] for headline in headlines]

    avg_sentiment = sum(sentiment_scores) / len(sentiment_scores)
    return round(avg_sentiment, 2)
