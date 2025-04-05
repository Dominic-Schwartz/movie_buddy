import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchTrendingMoviesWithTrailers } from "../../helpers/fetchTrailers";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators";
import "./TrailerCarousel.css";

const TrailerCarousel = () => {
    const [moviesWithTrailers, setMoviesWithTrailers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3; // Aantal slides dat getoond wordt

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
        }, 8000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    useEffect(() => {
        if (currentIndex >= moviesWithTrailers.length) {
            setCurrentIndex(0);
        }
    }, [moviesWithTrailers, currentIndex]);

    const goToSlide = (index) => setCurrentIndex(index);

    return (
        <div className="trailer-carousel-container">
            {moviesWithTrailers.length > 0 && moviesWithTrailers[currentIndex] && (
                <div className="trailer-frame-wrapper">
                    <iframe
                        className="trailer-video"
                        src={`https://www.youtube.com/embed/${moviesWithTrailers[currentIndex].trailer.key}?mute=1&controls=1`}
                        title={moviesWithTrailers[currentIndex].title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
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
