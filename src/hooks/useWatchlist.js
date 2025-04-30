import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext.js";

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error("useWatchlist moet binnen een WatchlistProvider gebruikt worden.");
    }
    return context;
};
