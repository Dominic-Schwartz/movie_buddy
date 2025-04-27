import PropTypes from "prop-types";
import styles from "./MessagePopup.module.css";

const MessagePopup = ({ message, type = "error", onClose }) => {
    if (!message) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div
                className={`${styles.popup} ${styles[type]}`}
                onClick={handlePopupClick}
            >
                {message}
            </div>
        </div>
    );
};

MessagePopup.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(["error", "success", "info"]),
    onClose: PropTypes.func.isRequired,
};

export default MessagePopup;
