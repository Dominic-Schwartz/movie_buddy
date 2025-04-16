import { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_BASE_URL } from "../constants/urls";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useMovieDetails = (movieId) => {
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [ageRating, setAgeRating] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieRes, creditsRes, ratingsRes] = await Promise.all([
                    axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
                        params: { api_key: API_KEY, language: "nl-NL" },
                    }),
                    axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
                        params: { api_key: API_KEY },
                    }),
                    axios.get(`${TMDB_BASE_URL}/movie/${movieId}/release_dates`, {
                        params: { api_key: API_KEY },
                    }),
                ]);

                setMovie(movieRes.data);
                setCredits(creditsRes.data);

                const nlRating = ratingsRes.data.results.find(
                    (r) => r?.iso_3166_1 === "NL"
                );
                const usRating = ratingsRes.data.results.find(
                    (r) => r?.iso_3166_1 === "US"
                );

                const rating =
                    nlRating?.release_dates?.[0]?.certification ||
                    usRating?.release_dates?.[0]?.certification;
                setAgeRating(rating || "n.v.t.");
            } catch (error) {
                console.error("Fout bij ophalen details:", error);
            }
        };

        if (movieId) void fetchMovieDetails();
    }, [movieId]);

    return { movie, credits, ageRating };
};
