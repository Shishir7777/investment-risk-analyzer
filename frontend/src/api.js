import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const fetchStockData = async (ticker) => {
    try {
        const response = await axios.get(`${BASE_URL}/analyze?ticker=${ticker}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};
