export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TRENDING_MOVIES_URL = `${TMDB_BASE_URL}/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`;
