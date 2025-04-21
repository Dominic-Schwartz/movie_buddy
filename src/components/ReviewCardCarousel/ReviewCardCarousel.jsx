import { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import ReviewCard from "../ReviewCard/ReviewCard";
import arrowLeft from "../../assets/svgs/arrowtriangle-left.svg";
import arrowRight from "../../assets/svgs/arrowtriangle-right.svg";
import styles from "./ReviewCardCarousel.module.css";

import { useCircularIndex } from "../../hooks/useCircularIndex";

const ReviewCardCarousel = ({ reviews }) => {
    const containerRef = useRef(null);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [expanded, setExpanded] = useState(false);

    const totalSlides = Math.ceil((reviews.length || 1) / itemsPerPage);

    const { index: currentIndex, prev: handlePrev, next: handleNext, setIndex } =
        useCircularIndex(totalSlides);

    useLayoutEffect(() => {
        const updateItems = () => {
            const w = containerRef.current?.offsetWidth || window.innerWidth;
            if (w < 480) setItemsPerPage(1);
            else if (w < 768) setItemsPerPage(2);
            else setItemsPerPage(3);
            setIndex(0);
        };

        updateItems();
        window.addEventListener("resize", updateItems);
        return () => window.removeEventListener("resize", updateItems);
    }, [setIndex]);

    if (!reviews || reviews.length === 0) {
        return (
            <div className={styles.reviewPlaceholder}>
                Deze film heeft nog geen reviews.
            </div>
        );
    }

    return (
        <section className={styles.reviewRow} ref={containerRef}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h2 className={styles.title}>Reviews</h2>
                    <div className={styles.arrows}>
                        <button onClick={handlePrev} className={styles.arrowBtn}>
                            <img src={arrowLeft} alt="←" />
                        </button>
                        <button onClick={handleNext} className={styles.arrowBtn}>
                            <img src={arrowRight} alt="→" />
                        </button>
                    </div>
                </div>
                <button
                    className={styles.toggleBtn}
                    onClick={() => setExpanded((e) => !e)}
                >
                    {expanded ? "Sluiten" : "All Reviews"}
                </button>
            </div>

            {expanded ? (
                <div className={styles.expandedGrid}>
                    {reviews.map((r) => (
                        <ReviewCard
                            key={r.id}
                            username={r.username}
                            text={r.text}
                            date={r.date}
                            reaction={r.reaction}
                            onShowAll={() => {}}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.cardContainer}>
                    {reviews
                        .slice(
                            currentIndex * itemsPerPage,
                            (currentIndex + 1) * itemsPerPage
                        )
                        .map((r) => (
                            <ReviewCard
                                key={r.id}
                                username={r.username}
                                text={r.text}
                                date={r.date}
                                reaction={r.reaction}
                                onShowAll={() => alert(`Toon alle reviews van ${r.username}`)}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

ReviewCardCarousel.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            username: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            reaction: PropTypes.oneOf(["like", "dislike"]).isRequired,
        })
    ).isRequired,
};

export default ReviewCardCarousel;
