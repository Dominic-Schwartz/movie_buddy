import PropTypes from "prop-types";
import { ReviewContext } from "./ReviewContext";
import { useAuth } from "../hooks/useAuth";

export const ReviewProvider = ({ children }) => {
    const { user } = useAuth();
    const username = user?.username;

    const addReview = (movieId, text, reaction) => {
        const username = user?.username;
        const avatar = localStorage.getItem(`avatar_${username}`);

        if (!username) return;

        const existing = JSON.parse(localStorage.getItem(`reviews_${movieId}`)) || [];

        const newReview = {
            username,
            avatar,
            text,
            reaction,
            date: new Date().toLocaleDateString("nl-NL"),
        };

        const updated = [...existing, newReview];
        localStorage.setItem(`reviews_${movieId}`, JSON.stringify(updated));
    };

    const getReviews = (movieId) => {
        return JSON.parse(localStorage.getItem(`reviews_${movieId}`)) || [];
    };

    const hasReviewed = (movieId) => {
        const all = getReviews(movieId);
        return all.some((review) => review.username === username);
    };

    return (
        <ReviewContext.Provider value={{ addReview, getReviews, hasReviewed }}>
            {children}
        </ReviewContext.Provider>
    );
};

ReviewProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
