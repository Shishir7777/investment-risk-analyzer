import { useState } from "react";

function StockInput({ onSearch }) {
    const [ticker, setTicker] = useState("");

    const handleSearch = () => {
        if (ticker.trim()) {
            onSearch(ticker.toUpperCase());
        }
    };

    return (
        <div className="flex gap-2 mt-5">
            <input
                type="text"
                placeholder="Enter stock ticker (e.g., TSLA)"
                className="border p-2 rounded w-80"
                onChange={(e) => setTicker(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSearch}>
                Analyze
            </button>
        </div>
    );
}

export default StockInput;
