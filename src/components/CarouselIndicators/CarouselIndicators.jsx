import PropTypes from "prop-types";
import styles from "./CarouselIndicators.module.css";

const CarouselIndicators = ({ totalSlides, currentIndex, goToSlide }) => {
    return (
        <div className={styles.carouselIndicators}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ""}`.trim()}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ga naar slide ${index + 1}`}
                ></button>
            ))}
        </div>
    );
};

CarouselIndicators.propTypes = {
    totalSlides: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    goToSlide: PropTypes.func.isRequired,
};

export default CarouselIndicators;