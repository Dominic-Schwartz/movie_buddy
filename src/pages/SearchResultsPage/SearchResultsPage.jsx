import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMoviesByGenreName, fetchMoviesByQuery } from "../../helpers/fetchMovies";
import styles from "./SearchResultsPage.module.css";

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const genre = queryParams.get("genre");

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchTitle = query ? `Resultaten voor: '${query}'` : genre ? `Genre: ${genre}` : "Resultaten";

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let fetched = [];
                if (query) {
                    fetched = await fetchMoviesByQuery(query);
                } else if (genre) {
                    fetched = await fetchMoviesByGenreName(genre);
                }
                setMovies(Array.isArray(fetched) ? fetched : []);
            } catch (error) {
                console.error(error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [query, genre]);

    return (
        <div className={styles.searchResultsPage}>
            <Navbar />
            <main className={styles.resultsContainer}>
                <h2 className={styles.resultsTitle}>{searchTitle}</h2>
                {loading ? (
                    <p>Even geduld...</p>
                ) : (
                    <div className={styles.resultsGrid}>
                        {movies.length > 0 ? (
                            movies.map(({ id, poster_path, title }) => (
                                <MovieCard
                                    key={id}
                                    movie={{
                                        poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
                                        title,
                                    }}
                                    onClick={() => navigate(`/movie/${id}`)}
                                />
                            ))
                        ) : (
                            <p>Geen resultaten gevonden.</p>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchResultsPage;
