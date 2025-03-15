import PropTypes from "prop-types";
import "./PasswordStrengthIndicator.css";

function PasswordStrengthIndicator({ strength }) {

    const getStrengthLabel = () => {
        switch (strength) {
            case 0:
            case 1:
                return "Zwak";
            case 2:
                return "Redelijk";
            case 3:
                return "Sterk";
            case 4:
                return "Zeer sterk";
            default:
                return "";
        }
    };

    return (
        <div className="password-strength-indicator">
            <p>Wachtwoord sterkte: {getStrengthLabel()}</p>
        </div>
    );
}

PasswordStrengthIndicator.propTypes = {
    strength: PropTypes.number.isRequired,
};

export default PasswordStrengthIndicator;
