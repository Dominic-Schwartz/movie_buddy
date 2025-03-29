import { useState } from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

import Button from "../Button/Button"; // bestaande component
import PlusIcon from "../../assets/svgs/plus.svg";
import MinIcon from "../../assets/svgs/minus.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";

const MovieCard = ({ movie, onClick }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [liked, setLiked] = useState(null);

    const handleWatchlistToggle = () => {
        setIsInWatchlist(!isInWatchlist);
    };

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
                <Button
                    text="watchlist"
                    icon={isInWatchlist ? MinIcon : PlusIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWatchlistToggle();
                    }}
                    className={`btn-moviecard-watchlist ${isInWatchlist ? "active" : ""}`}
                />

                <Button
                    icon={ThumbsUpIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike();
                    }}
                    className={`btn-like-icon ${liked === true ? "active" : ""}`}
                    variant="ghost"
                />

                <Button
                    icon={ThumbsDownIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDislike();
                    }}
                    className={`btn-like-icon ${liked === false ? "active" : ""}`}
                    variant="ghost"
                />

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
