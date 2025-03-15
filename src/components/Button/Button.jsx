import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ text, onClick, variant = "default", className = "" }) => {
    return (
        <button className={`btn ${variant} ${className}`} {...(onClick && { onClick })}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    className: PropTypes.string,
};

Button.defaultProps = {
    onClick: () => {},
    variant: "default",
    className: "",
};

export default Button;
