import PropTypes from "prop-types";
import styles from "./TermsCheckbox.module.css";

const TermsCheckbox = ({ isAccepted, setIsAccepted, openPopup }) => {
    return (
        <div className={styles.terms}>
            <div className={styles.termsCheckbox}>
                <input
                    type="checkbox"
                    id="terms"
                    checked={isAccepted}
                    onChange={(e) => setIsAccepted(e.target.checked)}
                />
            </div>
            <div>
                <label htmlFor="terms">
                    Ik ga akkoord met de{" "}
                    <span
                        className={styles.userTermsLink}
                        onClick={() => openPopup("terms")}
                    >
                        Gebruikersvoorwaarden
                    </span>{" "}
                    en{" "}
                    <span
                        className={styles.privacyTermsLink}
                        onClick={() => openPopup("privacy")}
                    >
                        Privacyverklaring
                    </span>
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
