import { useWatchlist } from "./useWatchlist";
import { useMemo } from "react";

export const useWatchlistToggle = (movie) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    const movieId = movie?.id;
    const isActive = useMemo(() => isInWatchlist(movieId), [isInWatchlist, movieId]);

    const toggleWatchlist = (e) => {
        e?.stopPropagation();
        if (!movieId) return;
        if (isActive) {
            removeFromWatchlist(movieId);
        } else {
            addToWatchlist(movie);
        }
    };

    return { isActive, toggleWatchlist };
};
