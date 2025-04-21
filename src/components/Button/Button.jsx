import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({
                    text,
                    onClick,
                    variant = "default",
                    className = "",
                    icon = null,
                    iconPosition = "left",
                    active = false,
                }) => {

    const activeClass =
        active && variant === "watchlist"
            ? styles.watchlistActive
            : active && variant === "like"
                ? styles.likeActive
                : active && variant === "dislike"
                    ? styles.dislikeActive
                    : "";

    const combinedClass = `${styles.btn} ${styles[variant]} ${activeClass} ${className}`.trim();

    return (
        <button
            className={combinedClass}
            {...(onClick && { onClick })}
        >
            {icon && iconPosition === "left" && <img src={icon} alt="icon" />}
            {text && <span>{text}</span>}
            {icon && iconPosition === "right" && <img src={icon} alt="icon" />}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(["left", "right"]),
    active: PropTypes.bool,
};

Button.defaultProps = {
    text: "",
    onClick: () => {},
    variant: "default",
    className: "",
    icon: null,
    iconPosition: "left",
    active: false,
};

export default Button;
