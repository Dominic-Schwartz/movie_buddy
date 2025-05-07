import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LikesContext } from "./LikesContext";
import { useAuth } from "../hooks/useAuth";
import { getAllLikes } from "../helpers/getAllLikes.js";

export const LikesProvider = ({ children }) => {
    const [likes, setLikes] = useState({});
    const { user } = useAuth();
    const username = user?.username;

    useEffect(() => {
        if (!username) {
            setLikes({});
            return;
        }
        const stored = localStorage.getItem(`likes_${username}`);
        setLikes(stored ? JSON.parse(stored) : {});
    }, [username]);

    const likeMovie = (movieId) => {
        if (!username) return;
        setLikes(prev => {
            const updated = { ...prev, [movieId]: "like" };
            localStorage.setItem(`likes_${username}`, JSON.stringify(updated));
            return updated;
        });
    };

    const dislikeMovie = (movieId) => {
        if (!username) return;
        setLikes(prev => {
            const updated = { ...prev, [movieId]: "dislike" };
            localStorage.setItem(`likes_${username}`, JSON.stringify(updated));
            return updated;
        });
    };

    const removeReaction = (movieId) => {
        if (!username) return;
        setLikes(prev => {
            const updated = { ...prev };
            delete updated[movieId];
            localStorage.setItem(`likes_${username}`, JSON.stringify(updated));
            return updated;
        });
    };

    const getReaction = (movieId) => likes[movieId] || null;

    const getAggregatedStats = (movieId) => {
        const allLikes = getAllLikes();
        const reactions = allLikes[movieId.toString()] || [];
        const total = reactions.length;
        const likeCount = reactions.filter(r => r === "like").length;
        const dislikeCount = reactions.filter(r => r === "dislike").length;
        return {
            likePercentage: total ? Math.round((likeCount / total) * 100) : 0,
            dislikePercentage: total ? Math.round((dislikeCount / total) * 100) : 0,
        };
    };

    return (
        <LikesContext.Provider
            value={{
                likes,
                likeMovie,
                dislikeMovie,
                removeReaction,
                getReaction,
                getAggregatedStats,
            }}
        >
            {children}
        </LikesContext.Provider>
    );
};

LikesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
