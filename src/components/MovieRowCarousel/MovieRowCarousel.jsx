import { useState, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieRowCarousel.module.css";
import arrowLeft from "../../assets/svgs/arrowtriangle-left.svg";
import arrowRight from "../../assets/svgs/arrowtriangle-right.svg";

import { useCircularIndex } from "../../hooks/useCircularIndex";

const MovieRowCarousel = ({ title, fetchFunction, genreId }) => {
    const [movies, setMovies] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const totalSlides = Math.ceil((movies.length || 1) / itemsPerPage);

    const { index: currentIndex, prev: handlePrev, next: handleNext } =
        useCircularIndex(totalSlides);

    useLayoutEffect(() => {
        const updateItemsPerPage = () => {
            const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;

            if (containerWidth >= 1250) setItemsPerPage(5);
            else if (containerWidth >= 1075) setItemsPerPage(4);
            else if (containerWidth >= 800) setItemsPerPage(3);
            else setItemsPerPage(2);
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

    const handleSeeAll = () => {
        const genreQuery = genreId
            ? genreId
            : title.toLowerCase().includes("trending")
                ? "trending"
                : title.toLowerCase();
        navigate(`/searchresults?genre=${genreQuery}`);
    };

    return (
        <div className={styles.movieRowCarousel} ref={containerRef}>
            <div className={styles.movieRowHeader}>
                <div className={styles.movieRowLeft}>
                    <h2 className={styles.movieRowTitle}>{title}</h2>
                    <div className={styles.movieRowArrows}>
                        <button onClick={handlePrev} className={styles.arrowBtn}>
                            <img src={arrowLeft} alt="Vorige" />
                        </button>
                        <button onClick={handleNext} className={styles.arrowBtn}>
                            <img src={arrowRight} alt="Volgende" />
                        </button>
                    </div>
                </div>
                <button className={styles.seeAllBtn} onClick={handleSeeAll}>
                    Bekijk alles
                </button>
            </div>

            <div className={styles.movieRowCards}>
                {movies
                    .slice(
                        currentIndex * itemsPerPage,
                        (currentIndex + 1) * itemsPerPage
                    )
                    .map(({ id, poster_path }) => (
                        <MovieCard
                            key={id}
                            movie={{ poster: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                            onClick={() => navigate(`/movie/${id}`)}
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
