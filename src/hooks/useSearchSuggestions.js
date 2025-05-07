import { useState } from "react";
import { fetchMoviesByQuery } from "../helpers/fetchMovies";

export function useSearchSuggestions() {
    const [suggestions, setSuggestions] = useState([]);

    const updateSuggestions = async (term) => {
        if (term.trim().length >= 2) {
            try {
                const result = await fetchMoviesByQuery(term);
                setSuggestions(result.slice(0, 5));
            } catch (e) {
                console.error("Error fetching suggestions:", e);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return { suggestions, updateSuggestions, clearSuggestions: () => setSuggestions([]) };
}