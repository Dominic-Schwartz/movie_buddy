import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { WatchlistContext } from "./WatchlistContext";
import { useAuth } from "../hooks/useAuth";

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useAuth();
    const username = user?.username;

    useEffect(() => {
        if (username) {
            const stored = localStorage.getItem(`watchlist_${username}`);
            if (stored) {
                setWatchlist(JSON.parse(stored));
            } else {
                setWatchlist([]);
            }
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
        }
    }, [watchlist, username]);

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
