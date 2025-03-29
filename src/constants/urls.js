export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`;

export const API_PROVIDER = {tmdb: "https://www.themoviedb.org/",};

export const API_URL = "https://api.datavortex.nl/moviebuddy/users"

export const SOCIAL_MEDIA_LINKS = {
    facebook: "https://www.facebook.com/...",
    instagram: "https://www.instagram.com/...",
    youtube: "https://www.youtube.com/...",
};

export const GENRE_IDS = {
    action: 28,
    thriller: 53,
    comedy: 35,
    fantasy: 14,
    romance: 10749,
    scifi: 878,
    horror: 27,
    animation: 16,
    drama: 18,
    adventure: 12,
};
