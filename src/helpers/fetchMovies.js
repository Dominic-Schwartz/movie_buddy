import axios from "axios";
import { TMDB_BASE_URL, GENRE_IDS } from "../constants/urls";

const API_KEY = import.meta.env.VITE_API_KEY;

const axiosFetchByGenre = async (genreId) => {
    try {
        const response = await axios.get(
            `${TMDB_BASE_URL}/discover/movie`,
            {
                params: {
                    api_key: API_KEY,
                    with_genres: genreId,
                    sort_by: "popularity.desc",
                    include_adult: false,
                    language: "nl-NL"
                },
            }
        );
        return response.data.results.slice(0, 18);
    } catch (error) {
        console.error(`Error fetching genre ${genreId}:`, error.message || error);
        return [];
    }
};

export const fetchTrendingMovies = async (limit = 9) => {
    try {
        const response = await axios.get(
            `${TMDB_BASE_URL}/trending/movie/week`,
            {
                params: {
                    api_key: API_KEY,
                }
            }
        );
        return response.data.results.slice(0, limit);
    } catch (error) {
        console.error("Error fetching trending movies:", error.message || error);
        return [];
    }
};

export const fetchMoviesByGenreName = async (genreName, limit = 24) => {
    try {
        if (genreName.toLowerCase() === "trending") {
            return await fetchTrendingMovies(limit);
        }

        const genreId = GENRE_IDS[genreName.toLowerCase()];
        if (!genreId) {
            console.warn("Onbekend genre:", genreName);
            return [];
        }

        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                sort_by: "popularity.desc",
                include_adult: false,
                language: "nl-NL",
            },
        });

        return response.data.results.slice(0, limit);
    } catch (error) {
        console.error(`Error fetching movies for genre ${genreName}:`, error.message);
        return [];
    }
};

export const fetchActionMovies = () => axiosFetchByGenre(GENRE_IDS.actie);
export const fetchThrillerMovies = () => axiosFetchByGenre(GENRE_IDS.thriller);
export const fetchComedyMovies = () => axiosFetchByGenre(GENRE_IDS.komedie);
export const fetchFantasyMovies = () => axiosFetchByGenre(GENRE_IDS.fantasy);
export const fetchRomanceMovies = () => axiosFetchByGenre(GENRE_IDS.romantiek);
export const fetchSciFiMovies  = () => axiosFetchByGenre(GENRE_IDS["science fiction"]);
export const fetchHorrorMovies = () => axiosFetchByGenre(GENRE_IDS.horror);
export const fetchAnimationMovies = () => axiosFetchByGenre(GENRE_IDS.animatie);
export const fetchDramaMovies = () => axiosFetchByGenre(GENRE_IDS.drama);
export const fetchAdventureMovies = () => axiosFetchByGenre(GENRE_IDS.avontuur);

export const fetchMoviesByQuery = async (query) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
                include_adult: false,
                language: "nl-NL",
            },
        });
        return response.data.results ?? [];
    } catch (error) {
        console.error(`Error fetching movies by query "${query}":`, error.message);
        return [];
    }
};

export const fetchSearchResults = async ({ query, genre, top }) => {
    try {
        if (query) return await fetchMoviesByQuery(query);

        if (genre) {
            const lower = genre.toLowerCase();
            if (lower === "trending") {
                return await fetchTrendingMovies(top ? 10 : 24);
            } else {
                return await fetchMoviesByGenreName(genre, top ? 10 : 24);
            }
        }

        return [];
    } catch (error) {
        console.error("Error fetching search results:", error.message);
        return [];
    }
};
