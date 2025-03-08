import PropTypes from "prop-types";
import "./ErrorPopup.css";

const ErrorPopup = ({ message, onClose }) => {
    if (!message) return null;


    const handleOverlayClick = () => {
        onClose();
    };

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="error-popup-overlay" onClick={handleOverlayClick}>
            <div className="error-popup" onClick={handlePopupClick}>
                {message}
            </div>
        </div>
    );
};

ErrorPopup.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default ErrorPopup;
