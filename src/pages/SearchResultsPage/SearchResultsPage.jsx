import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMoviesByGenreName } from "../../helpers/fetchMovies";
import styles from "./SearchResultsPage.module.css";

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const genre = queryParams.get("genre");

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async () => {
            if (genre) {
                try {
                    const fetched = await fetchMoviesByGenreName(genre);
                    setMovies(fetched);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, [genre]);

    return (
        <div className={styles.searchResultsPage}>
            <Navbar />
            <main className={styles.resultsContainer}>
                <h2 className={styles.resultsTitle}>{genre}</h2>
                <div className={styles.resultsGrid}>
                    {movies.map(({ id, poster_path, title }) => (
                        <MovieCard
                            key={id}
                            movie={{
                                poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
                                title,
                            }}
                            onClick={() => navigate(`/movie/${id}`)}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SearchResultsPage;