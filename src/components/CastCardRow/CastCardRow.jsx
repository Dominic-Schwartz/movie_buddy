import { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import CastCard from "../CastCard/CastCard";
import arrowLeft from "../../assets/svgs/arrowtriangle-left.svg";
import arrowRight from "../../assets/svgs/arrowtriangle-right.svg";
import styles from "./CastCardRow.module.css";

const CastCardRow = ({ cast }) => {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [expanded, setExpanded] = useState(false);

    useLayoutEffect(() => {
        const updateItemsPerPage = () => {
            const width = containerRef.current?.offsetWidth || window.innerWidth;
            if (width >= 1300) setItemsPerPage(7);
            else if (width >= 1100) setItemsPerPage(6);
            else if (width >= 900) setItemsPerPage(5);
            else if (width >= 700) setItemsPerPage(4);
            else if (width >= 500) setItemsPerPage(3);
            else setItemsPerPage(2);
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const totalSlides = Math.ceil(cast.length / itemsPerPage);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));

    if (!cast || cast.length === 0) return null;

    return (
        <section className={styles.castRow} ref={containerRef}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h2>Cast</h2>
                    <div className={styles.arrows}>
                        <button onClick={handlePrev} className={styles.arrowBtn}>
                            <img src={arrowLeft} alt="←" />
                        </button>
                        <button onClick={handleNext} className={styles.arrowBtn}>
                            <img src={arrowRight} alt="→" />
                        </button>
                    </div>
                </div>
                <button className={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Sluiten" : "All cast"}
                </button>
            </div>

            {expanded ? (
                <div className={styles.expandedGrid}>
                    {cast.map((actor) => (
                        <CastCard key={actor.cast_id || actor.id} actor={actor} />
                    ))}
                </div>
            ) : (
                <div className={styles.cardContainer}>
                    {cast
                        .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
                        .map((actor) => (
                            <CastCard key={actor.cast_id || actor.id} actor={actor} />
                        ))}
                </div>
            )}
        </section>
    );
};

CastCardRow.propTypes = {
    cast: PropTypes.arrayOf(
        PropTypes.shape({
            cast_id: PropTypes.number,
            id: PropTypes.number,
            name: PropTypes.string.isRequired,
            character: PropTypes.string.isRequired,
            profile_path: PropTypes.string,
        })
    ).isRequired,
};

export default CastCardRow;
