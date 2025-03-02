import "./Button.css";

const Button = ({ text, onClick, variant = "default", className = "" }) => {
    return (
        <button className={`btn ${variant} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
