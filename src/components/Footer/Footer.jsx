import "./Footer.css";

import facebookIcon from "../../assets/svgs/facebook.svg";
import instagramIcon from "../../assets/svgs/instagram.svg";
import youtubeIcon from "../../assets/svgs/youtube.svg";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>Powered by<a href="#"> The Movie Database (TMDb)</a></p>
                <p><a href="#">Gebruikersvoorwaarden</a> & <a href="#">Privacyverklaring</a></p>
            </div>
            <div className="footer-icons">
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className="footer-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="footer-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeIcon} alt="YouTube" className="footer-icon" />
                </a>
            </div>
            <div className="footer-disclaimer">
                <p>© 2025 Movie Buddy. Alle rechten voorbehouden.</p>
            </div>
        </footer>
    );
};

export default Footer;