import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import { fetchTrendingMovies } from "../../helpers/fetchMovies";
import MovieRowCarousel from "../../components/MovieRowCarousel/MovieRowCarousel";


const HomePage = () => {
    return (
        <div className="homePage">
            <Navbar/>

            {/* Hero-sectie (carousel/trailer) */}
            <section className="hero">
                <h2>Hero / Carousel komt hier</h2>
            </section>

            <MovieRowCarousel
                title="Trending Films"
                fetchFunction={fetchTrendingMovies}
            />

            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default HomePage;
