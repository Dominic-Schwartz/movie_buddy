import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";
import Button from "../Button/Button";
import PlusIcon from "../../assets/svgs/plus.svg";
import MinIcon from "../../assets/svgs/minus.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";
import { useLikes } from "../../hooks/useLikes";
import { useWatchlistToggle } from "../../hooks/useWatchlistToggle";

const MovieCard = ({ movie, onClick }) => {
    const { isInWatchlist, handleWatchlistToggle } = useWatchlistToggle(movie);

    const { likeMovie, dislikeMovie, removeReaction, getReaction } = useLikes();
    const userReaction = getReaction(movie.id);

    const handleLike = (e) => {
        e.stopPropagation();
        if (userReaction === "like") {
            removeReaction(movie.id);
        } else {
            likeMovie(movie.id);
        }
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        if (userReaction === "dislike") {
            removeReaction(movie.id);
        } else {
            dislikeMovie(movie.id);
        }
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
                    onClick={handleWatchlistToggle}
                    variant="watchlist"
                    active={isInWatchlist}
                />
                <Button
                    icon={ThumbsUpIcon}
                    iconPosition="left"
                    onClick={handleLike}
                    variant="like"
                    active={userReaction === "like"}
                />
                <Button
                    icon={ThumbsDownIcon}
                    iconPosition="left"
                    onClick={handleDislike}
                    variant="dislike"
                    active={userReaction === "dislike"}
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
