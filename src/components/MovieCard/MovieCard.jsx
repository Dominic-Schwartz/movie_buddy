import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import Button from "../Button/Button";
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
        <div className={styles.movieCard} onClick={onClick}>
            <div
                className={styles.moviePoster}
                style={{ backgroundImage: `url(${movie.poster})` }}
            />

            <div className={styles.movieActions}>
                <Button
                    text="watchlist"
                    icon={isInWatchlist ? MinIcon : PlusIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWatchlistToggle();
                    }}
                    variant="watchlist"
                    active={isInWatchlist}
                />

                <Button
                    icon={ThumbsUpIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike();
                    }}
                    variant="like"
                    active={liked === true}
                />

                <Button
                    icon={ThumbsDownIcon}
                    iconPosition="left"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDislike();
                    }}
                    variant="dislike"
                    active={liked === false}
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
