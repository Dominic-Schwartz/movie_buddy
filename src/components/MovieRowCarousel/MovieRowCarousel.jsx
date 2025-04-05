import { useState, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRowCarousel.css";

import arrowLeft from "../../assets/svgs/arrowtriangle-left.svg";
import arrowRight from "../../assets/svgs/arrowtriangle-right.svg";

const MovieRowCarousel = ({ title, fetchFunction, genreId }) => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const updateItemsPerPage = () => {
            const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;

            let cardWidth = 240;
            if (containerWidth <= 600) {
                cardWidth = 170;
            } else if (containerWidth <= 900) {
                cardWidth = 200;
            } else if (containerWidth <= 1200) {
                cardWidth = 220;
            }

            const maxCards = Math.floor((containerWidth + 24) / cardWidth);
            setItemsPerPage(Math.max(2, maxCards));
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const fetched = await fetchFunction();
                setMovies(fetched);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [fetchFunction]);

    const totalSlides = Math.ceil(movies.length / itemsPerPage);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
    const handleSeeAll = () => {
        const genreQuery = genreId
            ? genreId
            : title.toLowerCase().includes("trending")
                ? "trending"
                : title.toLowerCase();

        navigate(`/searchresults?genre=${genreQuery}`);
    };

    return (
        <div className="movie-row-carousel" ref={containerRef}>
            <div className="movie-row-header">
                <div className="movie-row-left">
                    <h2 className="movie-row-title">{title}</h2>
                    <div className="movie-row-arrows">
                        <button onClick={handlePrev} className="arrow-btn">
                            <img src={arrowLeft} alt="Vorige" />
                        </button>
                        <button onClick={handleNext} className="arrow-btn">
                            <img src={arrowRight} alt="Volgende" />
                        </button>
                    </div>
                </div>
                <button className="see-all-btn" onClick={handleSeeAll}>
                    Bekijk alles
                </button>
            </div>

            <div className="movie-row-cards">
                {movies
                    .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
                    .map(({ id, poster_path, title }) => (
                        <MovieCard
                            key={id}
                            movie={{ poster: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                            onClick={() => console.log(`Naar detailpagina van ${title}`)}
                        />
                    ))}
            </div>
        </div>
    );
};

MovieRowCarousel.propTypes = {
    title: PropTypes.string.isRequired,
    fetchFunction: PropTypes.func.isRequired,
    genreId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MovieRowCarousel;
