export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`;

export const API_PROVIDER = {tmdb: "https://www.themoviedb.org/",};

export const API_URL = "https://api.datavortex.nl/moviebuddy/users"

export const SOCIAL_MEDIA_LINKS = {
    facebook: "https://www.facebook.com/...",
    instagram: "https://www.instagram.com/...",
    youtube: "https://www.youtube.com/...",
};