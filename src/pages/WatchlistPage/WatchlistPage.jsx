import { useWatchlist } from "../../hooks/useWatchlist";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import styles from "./WatchlistPage.module.css";

const WatchlistPage = () => {
    const { watchlist } = useWatchlist();
    const navigate = useNavigate();

    return (
        <div className={styles.watchlistPage}>
            <Navbar />
            <main className={styles.mainContent}>
                <h2>Mijn Watchlist</h2>
                {watchlist.length === 0 ? (
                    <p className={styles.emptyMessage}>Je watchlist is nog leeg. Voeg films toe!</p>
                ) : (
                    <div className={styles.movieGrid}>
                        {watchlist.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default WatchlistPage;
