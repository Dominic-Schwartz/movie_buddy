import { useState, useEffect } from "react";
import {useLayoutEffect} from "react";
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

    useLayoutEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setItemsPerPage(2);
            } else if (width < 900) {
                setItemsPerPage(3);
            } else if (width < 1400) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(5);
            }
        };

        updateItemsPerPage(); // bij mount
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const loadMovies = async () => {
            const fetched = await fetchFunction();
            setMovies(fetched);
        };
        loadMovies();
    }, [fetchFunction]);

    const totalSlides = Math.ceil(movies.length / itemsPerPage);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
    const handleSeeAll = () => navigate(`/searchresults?genre=${genreId || title.toLowerCase()}`);

    return (
        <div className="movie-row-carousel">
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
                    .map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={{ poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            onClick={() => console.log(`Naar detailpagina van ${movie.title}`)}
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
