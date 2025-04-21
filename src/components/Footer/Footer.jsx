import styles from "./Footer.module.css";
import { API_PROVIDER, SOCIAL_MEDIA_LINKS } from "../../constants/urls";
import facebookIcon from "../../assets/svgs/facebook.svg";
import instagramIcon from "../../assets/svgs/instagram.svg";
import youtubeIcon from "../../assets/svgs/youtube.svg";
import { useState } from "react";
import TermsPrivacyPopup from "../TermsPrivacyPopup/TermsPrivacyPopup";

const Footer = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    const openPopup = (contentType) => {
        setPopupContent(contentType);
        setShowPopup(true);
    };

    return (
        <footer className={styles.footerContainer}>
            {showPopup && <TermsPrivacyPopup isOpen={showPopup} onClose={() => setShowPopup(false)} contentType={popupContent} />}
            <div className={styles.footerContent}>
                <p>Powered by <a href={API_PROVIDER.tmdb}> The Movie Database (TMDb)</a></p>
                <p>
                    <a onClick={() => openPopup("terms")} className={styles.termsLink}>Gebruikersvoorwaarden</a> &
                    <a onClick={() => openPopup("privacy")} className={styles.termsLink}> Privacyverklaring</a>
                </p>
            </div>
            <div className={styles.footerIcons}>
                <a href={SOCIAL_MEDIA_LINKS.facebook} target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className={styles.footerIcon} />
                </a>
                <a href={SOCIAL_MEDIA_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className={styles.footerIcon} />
                </a>
                <a href={SOCIAL_MEDIA_LINKS.youtube} target="_blank" rel="noopener noreferrer">
                    <img src={youtubeIcon} alt="YouTube" className={styles.footerIcon} />
                </a>
            </div>
            <div className={styles.footerDisclaimer}>
                <p>© 2025 Movie Buddy. Alle rechten voorbehouden.</p>
            </div>
        </footer>
    );
};

export default Footer;