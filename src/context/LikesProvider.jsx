import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LikesContext } from "./LikesContext";

export const LikesProvider = ({ children }) => {
    const [likes, setLikes] = useState({});

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
        setLikes((prev) => ({ ...prev, [movieId]: "like" }));
    };

    const dislikeMovie = (movieId) => {
        setLikes((prev) => ({ ...prev, [movieId]: "dislike" }));
    };

    const removeReaction = (movieId) => {
        setLikes((prev) => {
            const updated = { ...prev };
            delete updated[movieId];
            return updated;
        });
    };

    const getReaction = (movieId) => {
        return likes[movieId] || null;
    };

    return (
        <LikesContext.Provider
            value={{ likes, likeMovie, dislikeMovie, removeReaction, getReaction }}
        >
            {children}
        </LikesContext.Provider>
    );
};

LikesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
