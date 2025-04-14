import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTrendingMoviesWithTrailers } from "../../helpers/fetchTrailers";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators";
import TrailerPlayer from "../TrailerPlayer/TrailerPlayer";
import styles from "./TrailerCarousel.module.css";

const TrailerCarousel = () => {
    const [moviesWithTrailers, setMoviesWithTrailers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3;

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const data = await fetchTrendingMoviesWithTrailers(totalSlides);
                setMoviesWithTrailers(data);
            } catch (error) {
                console.error("Fout bij ophalen trailers:", error);
            }
        };

        getTrailers().catch((e) =>
            console.error("Ongedefinieerde trailerfout:", e)
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 10000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    useEffect(() => {
        if (currentIndex >= moviesWithTrailers.length) {
            setCurrentIndex(0);
        }
    }, [moviesWithTrailers, currentIndex]);

    const goToSlide = (index) => setCurrentIndex(index);

    return (
        <div className={styles.trailerCarouselContainer}>
            {moviesWithTrailers.length > 0 && moviesWithTrailers[currentIndex] && (
                <TrailerPlayer
                    movieId={moviesWithTrailers[currentIndex].id}
                    title={moviesWithTrailers[currentIndex].title}
                />
            )}

            <CarouselIndicators
                totalSlides={totalSlides}
                currentIndex={currentIndex}
                goToSlide={goToSlide}
            />
        </div>
    );
};

TrailerCarousel.propTypes = {
    totalSlides: PropTypes.number,
    currentIndex: PropTypes.number,
    goToSlide: PropTypes.func,
};

export default TrailerCarousel;
