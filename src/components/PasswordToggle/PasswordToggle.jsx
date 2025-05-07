import PropTypes from "prop-types";
import styles from "./PasswordToggle.module.css";
import EyeOpen from "../../assets/svgs/eye-open.svg";
import EyeClosed from "../../assets/svgs/eye-close.svg";

const PasswordToggle = ({ isVisible, onToggle }) => {
    return (
        <button type="button" className={styles.passwordToggle} onClick={onToggle}>
            <img
                src={isVisible ? EyeOpen : EyeClosed}
                alt="Toon wachtwoord"
            />
        </button>
    );
};

PasswordToggle.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default PasswordToggle;
