import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../helpers/fetchMovies";
import { formatImageUrl } from "../../helpers/formatImageUrl";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators.jsx";
import "./SlideShowCarousel.css";

const SlideShowCarousel = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const totalSlides = 3;

    useEffect(() => {
        const getMovies = async () => {
            try {
                const fetchedMovies = await fetchTrendingMovies();
                if (fetchedMovies.length > 0) {
                    setMovies(fetchedMovies);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        getMovies().catch(error => console.error("Unhandled error in getMovies:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                {movies
                    .slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)
                    .map((movie) => {
                        const posterUrl = formatImageUrl(movie.poster_path);

                        return (
                            <div key={movie.id} className="carousel-item">
                                {movie.poster_path ? (
                                    <img
                                        src={posterUrl}
                                        alt={movie.title}
                                        className="carousel-image"
                                    />
                                ) : (
                                    <div className="carousel-placeholder">Geen afbeelding</div>
                                )}
                            </div>
                        );
                    })}
            </div>

            <CarouselIndicators
                totalSlides={totalSlides}
                currentIndex={currentIndex}
                goToSlide={goToSlide}
            />
        </div>
    );
};

export default SlideShowCarousel;
