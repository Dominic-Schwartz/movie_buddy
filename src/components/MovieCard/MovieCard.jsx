import { useState } from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

import watchlistIcon from "../../assets/svgs/plus.svg";
import watchlistRemoveIcon from "../../assets/svgs/minus.svg";
import thumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import thumbsDownIcon from "../../assets/svgs/thumbs-down.svg";

const MovieCard = ({ movie, onClick }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [liked, setLiked] = useState(null);

    // Toggle watchlist status
    const handleWatchlistToggle = () => {
        setIsInWatchlist(!isInWatchlist);
    };

    // Toggle like/dislike
    const handleLike = () => {
        setLiked(liked === true ? null : true);
    };

    const handleDislike = () => {
        setLiked(liked === false ? null : false);
    };

    return (
        <div className="movie-card" onClick={onClick}>
            <div
                className="movie-poster"
                style={{ backgroundImage: `url(${movie.poster})` }}
            />

            <div className="movie-actions">
                <button
                    className={`watchlist-btn ${isInWatchlist ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWatchlistToggle();
                    }}
                >
                    <img src={isInWatchlist ? watchlistRemoveIcon : watchlistIcon} alt="Watchlist"/>
                    <span>Watchlist</span>
                </button>

                <button
                    className={`like-btn ${liked === true ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike();
                    }}
                >
                    <img src={thumbsUpIcon} alt="Like" />
                </button>

                <button
                    className={`dislike-btn ${liked === false ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDislike();
                    }}
                >
                    <img src={thumbsDownIcon} alt="Dislike" />
                </button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MovieCard;
