import PropTypes from "prop-types";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useState } from "react";
import styles from "./MovieCard.module.css";
import Button from "../Button/Button";
import PlusIcon from "../../assets/svgs/plus.svg";
import MinIcon from "../../assets/svgs/minus.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";

const MovieCard = ({ movie, onClick }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const isMovieInWatchlist = isInWatchlist(movie.id);

    const [liked, setLiked] = useState(null);

    const handleWatchlistToggle = (e) => {
        e.stopPropagation();
        if (isMovieInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setLiked(liked === true ? null : true);
    };

    const handleDislike = (e) => {
        e.stopPropagation();
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
                    icon={isMovieInWatchlist ? MinIcon : PlusIcon}
                    iconPosition="left"
                    onClick={handleWatchlistToggle}
                    variant="watchlist"
                    active={isMovieInWatchlist}
                />
                <Button
                    icon={ThumbsUpIcon}
                    iconPosition="left"
                    onClick={handleLike}
                    variant="like"
                    active={liked === true}
                />
                <Button
                    icon={ThumbsDownIcon}
                    iconPosition="left"
                    onClick={handleDislike}
                    variant="dislike"
                    active={liked === false}
                />
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster: PropTypes.string.isRequired,
        title: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MovieCard;
