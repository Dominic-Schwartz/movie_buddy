import axios from "axios";
import { TMDB_BASE_URL } from "../constants/urls";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchTrailerByMovieId = async (movieId) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos`, {
            params: {
                api_key: API_KEY,
                language: "en-US"
            }
        });

        const trailers = response.data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        return trailers[0] || null;
    } catch (error) {
        console.error(`Error fetching trailer for movie ${movieId}:`, error.message);
        return null;
    }
};

export const fetchTrendingMoviesWithTrailers = async (limit = 5) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
            params: { api_key: API_KEY }
        });

        const movies = response.data.results.slice(0, limit);

        const moviesWithTrailers = await Promise.all(
            movies.map(async (movie) => {
                const trailer = await fetchTrailerByMovieId(movie.id);
                return trailer ? { ...movie, trailer } : null;
            })
        );

        return moviesWithTrailers.filter(Boolean);
    } catch (error) {
        console.error("Error fetching trending movies with trailers:", error.message);
        return [];
    }
};
