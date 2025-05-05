import { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../context/ReviewContext";

export const useReviews = (movieId) => {
    const { addReview, getReviews, hasReviewed } = useContext(ReviewContext);
    const [reviews, setReviews] = useState([]);
    const [userHasReviewed, setUserHasReviewed] = useState(false);

    useEffect(() => {
        if (movieId) {
            setReviews(getReviews(movieId));
            setUserHasReviewed(hasReviewed(movieId));
        }
    }, [movieId, getReviews, hasReviewed]);

    const submitReview = (text, reaction) => {
        addReview(movieId, text, reaction);
        const updated = getReviews(movieId);
        setReviews(updated);
        setUserHasReviewed(true);
    };

    return {
        reviews,
        userHasReviewed,
        submitReview,
    };
};
