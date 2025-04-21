import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../helpers/fetchMovies";
import { formatImageUrl } from "../../helpers/formatImageUrl";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators.jsx";
import styles from "./SlideShowCarousel.module.css";

const SlideShowCarousel = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
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
            const nextIndex = (currentIndex + 1) % totalSlides;
            setCurrentIndex(nextIndex);
            setTimeout(() => setIsTransitioning(true), 10);
            setTimeout(() => setIsTransitioning(false), 400);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, totalSlides]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(true), 10);
        setTimeout(() => setIsTransitioning(false), 400);
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={`${styles.carousel} ${isTransitioning ? styles.fadeSlide : ""}`}>
                {movies
                    .slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)
                    .map((movie) => {
                        const posterUrl = formatImageUrl(movie.poster_path);

                        return (
                            <div key={movie.id} className={styles.carouselItem}>
                                {movie.poster_path ? (
                                    <img
                                        src={posterUrl}
                                        alt={movie.title}
                                        className={styles.carouselImage}
                                    />
                                ) : (
                                    <div className={styles.carouselPlaceholder}>Geen afbeelding</div>
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