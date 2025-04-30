import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { WatchlistContext } from "./WatchlistContext";

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = localStorage.getItem("watchlist");
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.find((m) => m.id === movie.id)) {
            setWatchlist((prev) => [...prev, movie]);
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some((m) => m.id === movieId);
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

WatchlistProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
