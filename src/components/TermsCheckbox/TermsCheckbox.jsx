import PropTypes from "prop-types";

const TermsCheckbox = ({ isAccepted, setIsAccepted, openPopup }) => {
    return (
        <div className="terms">
            <div className="terms-checkbox">
                <input
                    type="checkbox"
                    id="terms"
                    checked={isAccepted}
                    onChange={(e) => setIsAccepted(e.target.checked)}
                />
            </div>
            <div className="terms-link">
                <label>
                    Ik ga akkoord met de { " " }
                    <a onClick={() => openPopup("terms")} className="user-terms-link">
                        Gebruikersvoorwaarden
                    </a>{ " " } en { " " }
                    <a onClick={() => openPopup("privacy")} className="privacy-terms-link">
                        Privacyverklaring
                    </a>
                </label>
            </div>
        </div>
    );
};

TermsCheckbox.propTypes = {
    isAccepted: PropTypes.bool.isRequired,
    setIsAccepted: PropTypes.func.isRequired,
    openPopup: PropTypes.func.isRequired,
};

export default TermsCheckbox;
