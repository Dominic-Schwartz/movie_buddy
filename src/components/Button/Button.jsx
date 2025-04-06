import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
                    text,
                    onClick,
                    variant = "default",
                    className = "",
                    icon = null,
                    iconPosition = "left",
                }) => {
    return (
        <button className={`btn ${variant} ${className}`} {...(onClick && {onClick})}>

            {icon && iconPosition === "left" && <img src={icon} alt="icon" className="btn-icon"/>}
            {text && <span>{text}</span>}
            {icon && iconPosition === "right" && <img src={icon} alt="icon" className="btn-icon"/>}
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
};

Button.defaultProps = {
    text: "",
    onClick: () => {},
    variant: "default",
    className: "",
    icon: null,
    iconPosition: "left",
};

export default Button;
