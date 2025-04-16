import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { TMDB_BASE_URL } from "../../constants/urls";
import TrailerPlayer from "../../components/TrailerPlayer/TrailerPlayer";

import Button from "../../components/Button/Button";
import PlusIcon from "../../assets/svgs/plus.svg";
import MinIcon from "../../assets/svgs/minus.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";
import BubbleIcon from "../../assets/svgs/bubble.svg";

import styles from "./MovieDetailPage.module.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [ageRating, setAgeRating] = useState(null);

    // States voor de actieknoppen
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [liked, setLiked] = useState(null);
    // Placeholder percentages
    const [likePercentage] = useState(98);
    const [dislikePercentage] = useState(2);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieRes, creditsRes, ratingsRes] = await Promise.all([
                    axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
                        params: { api_key: API_KEY, language: "nl-NL" },
                    }),
                    axios.get(`${TMDB_BASE_URL}/movie/${id}/credits`, {
                        params: { api_key: API_KEY },
                    }),
                    axios.get(`${TMDB_BASE_URL}/movie/${id}/release_dates`, {
                        params: { api_key: API_KEY },
                    }),
                ]);

                setMovie(movieRes.data);
                setCredits(creditsRes.data);

                const nlRating = ratingsRes.data.results.find(
                    (r) => r?.iso_3166_1 === "NL"
                );
                const usRating = ratingsRes.data.results.find(
                    (r) => r?.iso_3166_1 === "US"
                );

                const rating =
                    nlRating?.release_dates?.[0]?.certification ||
                    usRating?.release_dates?.[0]?.certification;
                setAgeRating(rating || "n.v.t.");
            } catch (error) {
                console.error("Fout bij ophalen details:", error);
            }
        };

        if (id) void fetchMovieDetails();
    }, [id]);

    const getCrewMembers = (job) =>
        credits?.crew
            ?.filter((member) => member?.job === job)
            .map((m) => m.name)
            .join(", ");

    const backgroundImageStyle = movie?.backdrop_path
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }
        : {};

    // Handlers voor de actieknoppen
    const handleWatchlistToggle = (e) => {
        e.stopPropagation();
        setIsInWatchlist(!isInWatchlist);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setLiked(liked === true ? null : true);
    };

    const handleDislike = (e) => {
        e.stopPropagation();
        setLiked(liked === false ? null : false);
    };

    const handleReview = (e) => {
        e.stopPropagation();
        // Hier komt logica voor het plaatsen van een review
        console.log("Review button clicked!");
    };

    return (
        <div className={styles.movieDetailPage} style={backgroundImageStyle}>
            <Navbar />
            <main className={styles.detailContainer}>
                {movie ? (
                    <div className={styles.movieDetailContent}>
                        <div className={styles.trailerGroup}>
                            <div className={styles.trailerPlaceholder}>
                                <TrailerPlayer
                                    movieId={parseInt(id)}
                                    title={movie.title}
                                />
                            </div>
                            <div className={styles.actionsContainer}>
                                <Button
                                    text="watchlist"
                                    icon={
                                        isInWatchlist ? MinIcon : PlusIcon
                                    }
                                    iconPosition="left"
                                    onClick={handleWatchlistToggle}
                                    variant="watchlist"
                                    active={isInWatchlist}
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
                                        <span className={styles.likePercentage}>{likePercentage}%</span>
                                        <Button
                                            icon={ThumbsUpIcon}
                                            iconPosition="left"
                                            onClick={handleLike}
                                            variant="like"
                                            active={liked === true}
                                        />
                                    </div>

                                    <div className={styles.dislikeGroup}>
                                        <span className={styles.dislikePercentage}>{dislikePercentage}%</span>
                                        <Button
                                            icon={ThumbsDownIcon}
                                            iconPosition="left"
                                            onClick={handleDislike}
                                            variant="dislike"
                                            active={liked === false}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={styles.movieInfo}>
                            <h1>
                                {movie.title} (
                                {new Date(movie?.release_date).getFullYear()})
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
                                        <strong>Regie:</strong>{" "}
                                        {getCrewMembers("Director")}
                                    </p>
                                    <p className={styles.crewLine}>
                                        <strong>Scenario:</strong>{" "}
                                        {getCrewMembers("Writer") ||
                                            getCrewMembers("Screenplay")}
                                    </p>
                                    <p className={styles.crewLine}>
                                        <strong>Producent:</strong>{" "}
                                        {getCrewMembers("Producer")}
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                ) : (
                    <p>Filmgegevens worden geladen...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default MovieDetailPage;
