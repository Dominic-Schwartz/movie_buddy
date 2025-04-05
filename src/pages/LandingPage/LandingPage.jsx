import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputGroup from "../../components/InputGroup/InputGroup";
import SlideShowCarousel from "../../components/SlideShowCarousel/SlideShowCarousel.jsx";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-main">
            <div className="landing-header">
                <div className="landing-header-content">
                    <p className="logo-only">MOVIE BUDDY</p>
                    <Button text="Inloggen" variant="login" onClick={() => navigate("/login")} />
                </div>
            </div>

            <header className="hero-section">
                <h1>Alles wat je moet weten over je favoriete films op één plek</h1>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" onClick={() => navigate("/register")} />
                </div>
            </header>

            <section className="features-section">
                <h2>Wat heeft Movie Buddy jou te bieden?</h2>
                <p>Ontdek de nieuwste films, bekijk trailers en lees uitgebreide informatie over je favorieten.</p>
            </section>

            <section className="carousel-section">
                <SlideShowCarousel />
            </section>

            <section className="register-section">
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" onClick={() => navigate("/register")} />
                </div>
            </section>

            <footer className="landing-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default LandingPage;
