import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LikesContext } from "./LikesContext";
import { useAuth } from "../hooks/useAuth";

export const LikesProvider = ({ children }) => {
    const [likes, setLikes] = useState({});
    const { user } = useAuth();
    const username = user?.username;

    console.log("Current user in LikesProvider:", username);


    useEffect(() => {
        const storedLikes = localStorage.getItem("likes");
        if (storedLikes) {
            setLikes(JSON.parse(storedLikes));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("likes", JSON.stringify(likes));
    }, [likes]);

    const likeMovie = (movieId) => {
        if (!username) return;
        setLikes((prev) => ({
            ...prev,
            [username]: {
                ...(prev[username] || {}),
                [movieId]: "like",
            },
        }));
    };

    const dislikeMovie = (movieId) => {
        if (!username) return;
        setLikes((prev) => ({
            ...prev,
            [username]: {
                ...(prev[username] || {}),
                [movieId]: "dislike",
            },
        }));
    };

    const removeReaction = (movieId) => {
        if (!username) return;
        setLikes((prev) => {
            const updatedUserLikes = { ...(prev[username] || {}) };
            delete updatedUserLikes[movieId];

            return {
                ...prev,
                [username]: updatedUserLikes,
            };
        });
    };

    const getReaction = (movieId) => {
        if (!username) return null;
        return likes[username]?.[movieId] || null;
    };

    const getAggregatedStats = (movieId) => {
        const allReactions = Object.values(likes)
            .map((userLikes) => userLikes[movieId])
            .filter(Boolean);

        const total = allReactions.length;
        const likesCount = allReactions.filter((r) => r === "like").length;
        const dislikesCount = allReactions.filter((r) => r === "dislike").length;

        return {
            likePercentage: total ? Math.round((likesCount / total) * 100) : 0,
            dislikePercentage: total ? Math.round((dislikesCount / total) * 100) : 0,
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
