import axios from "axios";
import { TRENDING_MOVIES_URL } from "../constants/urls";

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(TRENDING_MOVIES_URL);
        return response.data.results.slice(0, 9);
    } catch (error) {
        console.error("Error fetching trending movies:", error.message || error);
        return [];
    }
};



