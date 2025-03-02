import "./CarouselIndicators.css";
import PropTypes from "prop-types";

const CarouselIndicators = ({ totalSlides, currentIndex, goToSlide }) => {
    return (
        <div className="carousel-indicators">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    className={`indicator ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
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
