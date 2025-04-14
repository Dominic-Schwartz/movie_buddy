import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { TMDB_BASE_URL } from "../../constants/urls";
import TrailerPlayer from "../../components/TrailerPlayer/TrailerPlayer";
import "./MovieDetailPage.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [ageRating, setAgeRating] = useState(null);

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

                const nlRating = ratingsRes.data.results.find((r) => r.iso_3166_1 === "NL");
                const usRating = ratingsRes.data.results.find((r) => r.iso_3166_1 === "US");

                const rating = nlRating?.release_dates?.[0]?.certification || usRating?.release_dates?.[0]?.certification;
                setAgeRating(rating || "n.v.t.");
            } catch (error) {
                console.error("Fout bij ophalen details:", error);
            }
        };

        if (id) void fetchMovieDetails();
    }, [id]);

    const getCrewMembers = (job) =>
        credits?.crew?.filter((member) => member.job === job).map((m) => m.name).join(", ");

    const backgroundImageStyle = movie?.backdrop_path
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }
        : {};

    return (
        <div className="movie-detail-page" style={backgroundImageStyle}>
            <Navbar />
            <main className="detail-container">
                {movie ? (
                    <div className="movie-detail-content">
                        <div className="trailer-placeholder">
                            <TrailerPlayer movieId={parseInt(id)} title={movie.title} />
                        </div>
                        <div className="movie-info">
                            <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                            <p className="movie-summary">{movie.overview}</p>

                            {movie.genres && (
                                <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
                            )}

                            {movie.runtime && (
                                <p><strong>Duur:</strong> {movie.runtime} minuten</p>
                            )}

                            {ageRating && (
                                <p><strong>Leeftijd:</strong> {ageRating}</p>
                            )}

                            {credits && (
                                <>
                                    <p><strong>Regie:</strong> {getCrewMembers("Director")}</p>
                                    <p><strong>Scenario:</strong> {getCrewMembers("Writer") || getCrewMembers("Screenplay")}</p>
                                    <p><strong>Producent:</strong> {getCrewMembers("Producer")}</p>
                                </>
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
