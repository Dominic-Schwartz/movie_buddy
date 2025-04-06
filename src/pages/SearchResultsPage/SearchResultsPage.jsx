import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMoviesByGenreName } from "../../helpers/fetchMovies";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
    const location = useLocation();
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
        <div className="search-results-page">
            <Navbar />
            <main className="results-container">
                <h2 className="results-title">{genre}</h2>
                <div className="results-grid">
                    {movies.map(({ id, poster_path, title }) => (
                        <MovieCard
                            key={id}
                            movie={{
                                poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
                            }}
                            onClick={() => console.log(`Klik op: ${title}`)}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SearchResultsPage;
