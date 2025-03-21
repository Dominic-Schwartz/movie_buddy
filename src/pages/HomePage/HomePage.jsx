import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import MovieCard from "../../components/MovieCard/MovieCard";

const testMovies = [
    { poster: "https://image.tmdb.org/t/p/w500/8YxF2KO8qPNJiEyDntpWipz2JSn.jpg" },
    { poster: "https://image.tmdb.org/t/p/w500/rNbPgFu3NwMQ4GfAxcwBQK9izvT.jpg" },
    { poster: "https://image.tmdb.org/t/p/w500/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg" },
];

const HomePage = () => {
    return (
        <div className="homePage">
            <Navbar/>

            {/* Hero-sectie (carousel/trailer) */}
            <section className="hero">
                <h2>Hero / Carousel komt hier</h2>
            </section>

            <div>
                <h1>Movie Cards</h1>
                <div style={{display: "flex", gap: "20px"}}>
                    {testMovies.map((movie, index) => (
                        <MovieCard key={index} movie={movie}
                                   onClick={() => console.log(`Navigeren naar ${movie.poster}`)}/>
                    ))}
                </div>
            </div>

            {/* Contentsecties (horizontale rijen) */}
            <section className="contentRows">
                <h2>Filmrijen komen hier</h2>
            </section>

            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default HomePage;
