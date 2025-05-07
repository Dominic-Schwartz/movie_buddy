import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TrailerPlayer from "../../components/TrailerPlayer/TrailerPlayer";
import Button from "../../components/Button/Button";
import CastCardRow from "../../components/CastCardRow/CastCardRow";
import ReviewCardCarousel from "../../components/ReviewCardCarousel/ReviewCardCarousel";
import LikeDislikeStats from "../../components/LikeDislikeStats/LikeDislikeStats";
import ReviewForm from "../../components/ReviewForm/ReviewForm.jsx";
import { useWatchlistToggle } from "../../hooks/useWatchlistToggle";
import { useReviews } from "../../hooks/useReviews";

import PlusIcon from "../../assets/svgs/plus.svg";
import MinIcon from "../../assets/svgs/minus.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";
import BubbleIcon from "../../assets/svgs/bubble.svg";
import styles from "./MovieDetailPage.module.css";

import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useLikes } from "../../hooks/useLikes";

const MovieDetailPage = () => {
    const { id } = useParams();
    const movieId = parseInt(id);
    const { movie, credits, ageRating } = useMovieDetails(movieId);
    const { reviews, userHasReviewed, submitReview } = useReviews(movieId);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    const { isActive: isMovieInWatchlist, toggleWatchlist } = useWatchlistToggle({
        id: movieId,
        title: movie?.title,
        poster: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
    });

    const { likeMovie, dislikeMovie, removeReaction, getReaction, getAggregatedStats } = useLikes();
    const userReaction = getReaction(movieId);

    const stats = useMemo(() => getAggregatedStats(movieId), [getAggregatedStats, movieId]);
    const likePercentage = stats.likePercentage;
    const dislikePercentage = stats.dislikePercentage;

    const getCrewMembers = (job) =>
        credits?.crew?.filter((m) => m?.job === job).map((m) => m.name).join(", ");

    const backgroundImageStyle = movie?.backdrop_path
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }
        : {};

    const handleLike = (e) => {
        e.stopPropagation();
        userReaction === "like" ? removeReaction(movieId) : likeMovie(movieId);
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        userReaction === "dislike" ? removeReaction(movieId) : dislikeMovie(movieId);
    };

    return (
        <>
            {movie?.backdrop_path && <div className={styles.backdropFixed} style={backgroundImageStyle} />}
            <div className={styles.movieDetailPage}>
                <Navbar />
                <main className={styles.detailContainer}>
                    {movie ? (
                        <div className={styles.movieDetailContent}>
                            <div className={styles.trailerGroup}>
                                <div className={styles.trailerPlaceholder}>
                                    <TrailerPlayer movieId={movieId} title={movie.title} />
                                </div>
                                <div className={styles.actionsContainer}>
                                    <Button
                                        text="watchlist"
                                        icon={isMovieInWatchlist ? MinIcon : PlusIcon}
                                        iconPosition="left"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWatchlist();
                                        }}
                                        variant="watchlist"
                                        active={isMovieInWatchlist}
                                    />

                                    <Button
                                        text={userHasReviewed ? "Review geplaatst" : "Plaats review"}
                                        icon={BubbleIcon}
                                        iconPosition="left"
                                        onClick={() => {
                                            if (!userHasReviewed) setIsReviewFormOpen(true);
                                        }}
                                        variant="review"
                                        disabled={userHasReviewed}
                                    />
                                    {isReviewFormOpen && !userHasReviewed && (
                                        <ReviewForm
                                            onSubmit={(text) => {
                                                submitReview(text, userReaction);
                                            }}
                                            onCancel={() => setIsReviewFormOpen(false)}
                                        />
                                    )}

                                    <div className={styles.likeDislikeContainer}>
                                        <div className={styles.likeGroup}>
                                            <LikeDislikeStats percentage={likePercentage} type="likes" />
                                            <Button
                                                icon={ThumbsUpIcon}
                                                iconPosition="left"
                                                onClick={handleLike}
                                                variant="like"
                                                active={userReaction === "like"}
                                            />
                                        </div>

                                        <div className={styles.dislikeGroup}>
                                            <LikeDislikeStats percentage={dislikePercentage} type="dislikes" />
                                            <Button
                                                icon={ThumbsDownIcon}
                                                iconPosition="left"
                                                onClick={handleDislike}
                                                variant="dislike"
                                                active={userReaction === "dislike"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.movieInfo}>
                                <h1>
                                    {movie.title} ({new Date(movie?.release_date).getFullYear()})
                                </h1>
                                <p className={styles.movieMeta}>
                                    pg-{ageRating} &nbsp;•&nbsp; {movie?.production_companies?.[0]?.name} &nbsp;•&nbsp; {movie?.runtime}m
                                </p>

                                <p className={styles.movieSummary}>{movie.overview}</p>

                                {movie?.genres && (
                                    <ul className={styles.genreList}>
                                        {movie.genres.map((g) => (
                                            <li key={g.id || g.name}>{g.name}</li>
                                        ))}
                                    </ul>
                                )}

                                {credits && (
                                    <div className={styles.crewContainer}>
                                        <p className={styles.crewLine}>
                                            <strong>Regie:</strong> {getCrewMembers("Director")}
                                        </p>
                                        <p className={styles.crewLine}>
                                            <strong>Scenario:</strong> {getCrewMembers("Writer") || getCrewMembers("Screenplay")}
                                        </p>
                                        <p className={styles.crewLine}>
                                            <strong>Producent:</strong> {getCrewMembers("Producer")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Filmgegevens worden geladen...</p>
                    )}
                    {credits?.cast && <CastCardRow cast={credits.cast} />}
                    <ReviewCardCarousel reviews={reviews} />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MovieDetailPage;
