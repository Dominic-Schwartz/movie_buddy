import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TrailerPlayer from "../../components/TrailerPlayer/TrailerPlayer";
import Button from "../../components/Button/Button";
import CastCardRow from "../../components/CastCardRow/CastCardRow";
import ReviewCardCarousel from "../../components/ReviewCardCarousel/ReviewCardCarousel";
import LikeDislikeStats from "../../components/LikeDislikeStats/LikeDislikeStats";
import { useWatchlist } from "../../hooks/useWatchlist";

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
    const { movie, credits, ageRating } = useMovieDetails(id);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const { likeMovie, dislikeMovie, removeReaction, getReaction } = useLikes();
    const userReaction = getReaction(parseInt(id));
    const { getAggregatedStats } = useLikes();
    const stats = useMemo(() => {
        return getAggregatedStats(parseInt(id));
    }, [getAggregatedStats, id]);
    const likePercentage = stats.likePercentage;
    const dislikePercentage = stats.dislikePercentage;

    const isMovieInWatchlist = isInWatchlist(parseInt(id));

    const getCrewMembers = (job) =>
        credits?.crew
            ?.filter((member) => member?.job === job)
            .map((m) => m.name)
            .join(", ");

    const backgroundImageStyle = movie?.backdrop_path
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }
        : {};

    const handleWatchlistToggle = (e) => {
        e.stopPropagation();
        if (isMovieInWatchlist) {
            removeFromWatchlist(parseInt(id));
        } else {
            if (movie) {
                addToWatchlist({
                    id: parseInt(id),
                    title: movie.title,
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                });
            }
        }
    };

    const handleLike = (e) => {
        e.stopPropagation();
        console.log("liked!");
        if (userReaction === "like") {
            removeReaction(parseInt(id));
        } else {
            likeMovie(parseInt(id));
        }
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        if (userReaction === "dislike") {
            removeReaction(parseInt(id));
        } else {
            dislikeMovie(parseInt(id));
        }
    };

    const handleReview = (e) => {
        e.stopPropagation();
        console.log("Review button clicked!");
    };

    const dummyReviews = [
        {
            id: 1,
            username: "Movie_F@n#1",
            text: "Loved it!! Dit is een wat langere tekst om te testen of de kaart groeit.",
            date: "25-1-2025",
            reaction: "like",
        },
        {
            id: 2,
            username: "Cin@m_All",
            text: "Seen better!",
            date: "2-1-2025",
            reaction: "dislike",
        },
        {
            id: 3,
            username: "M0v13M@n!4C",
            text: "Best Movie ever!",
            date: "15-5-2024",
            reaction: "like",
        },
        {
            id: 4,
            username: "Dud3",
            text: "Whatever!",
            date: "15-5-2024",
            reaction: "like",
        },
    ];

    return (
        <>
            {movie?.backdrop_path && (
                <div className={styles.backdropFixed} style={backgroundImageStyle} />
            )}
            <div className={styles.movieDetailPage}>
                <Navbar />
                <main className={styles.detailContainer}>
                    {movie ? (
                        <div className={styles.movieDetailContent}>
                            <div className={styles.trailerGroup}>
                                <div className={styles.trailerPlaceholder}>
                                    <TrailerPlayer movieId={parseInt(id)} title={movie.title} />
                                </div>
                                <div className={styles.actionsContainer}>
                                    <Button
                                        text="watchlist"
                                        icon={isMovieInWatchlist ? MinIcon : PlusIcon}
                                        iconPosition="left"
                                        onClick={handleWatchlistToggle}
                                        variant="watchlist"
                                        active={isMovieInWatchlist}
                                    />

                                    <Button
                                        text="plaats review"
                                        icon={BubbleIcon}
                                        iconPosition="left"
                                        onClick={handleReview}
                                        variant="review"
                                    />

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

                                <p className={styles.movieSummary}>
                                    {movie.overview}
                                </p>

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
                    <ReviewCardCarousel reviews={dummyReviews} />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MovieDetailPage;
