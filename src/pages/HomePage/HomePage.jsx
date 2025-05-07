import styles from "./HomePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import MovieRowCarousel from "../../components/MovieRowCarousel/MovieRowCarousel";
import TrailerCarousel from "../../components/TrailerCarousel/TrailerCarousel.jsx";

import {
    fetchTrendingMovies,
    fetchActionMovies,
    fetchThrillerMovies,
    fetchComedyMovies,
    fetchFantasyMovies,
    fetchRomanceMovies,
    fetchSciFiMovies,
    fetchHorrorMovies,
    fetchAnimationMovies,
    fetchDramaMovies,
    fetchAdventureMovies
} from "../../helpers/fetchMovies";

const movieRows = [
    { title: "Trending Films", fetchFunction: () => fetchTrendingMovies(18) },
    { title: "Actie", fetchFunction: fetchActionMovies },
    { title: "Thriller", fetchFunction: fetchThrillerMovies },
    { title: "Komedie", fetchFunction: fetchComedyMovies },
    { title: "Fantasy", fetchFunction: fetchFantasyMovies },
    { title: "Romantiek", fetchFunction: fetchRomanceMovies },
    { title: "Science Fiction", fetchFunction: fetchSciFiMovies },
    { title: "Horror", fetchFunction: fetchHorrorMovies },
    { title: "Animatie", fetchFunction: fetchAnimationMovies },
    { title: "Drama", fetchFunction: fetchDramaMovies },
    { title: "Avontuur", fetchFunction: fetchAdventureMovies },
];

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <Navbar />
            <TrailerCarousel />
            {movieRows.map((row, index) => (
                <section key={index} className={styles.carouselSection}>
                    <MovieRowCarousel
                        title={row.title}
                        fetchFunction={row.fetchFunction}
                    />
                </section>
            ))}
            <Footer />
        </div>
    );
};

export default HomePage;
