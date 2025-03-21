import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputGroup from "../../components/InputGroup/InputGroup";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-main">
            <nav className="navbar-container">
                <div className="navbar-items">
                    <p className="logo-only">MOVIE BUDDY</p>
                    <Button text="Inloggen" onClick={() => navigate("/login")} />
                </div>
            </nav>

            <header className="header-main">
                <h1>Alles wat je moet weten over je favoriete films op één plek</h1>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" onClick={() => navigate("/register")} />
                </div>
            </header>

            <section className="landing-features">
                <h2>Wat heeft Movie Buddy jou te bieden?</h2>
                <p>Ontdek de nieuwste films, bekijk trailers en lees uitgebreide informatie over je favorieten.</p>
            </section>

            <section className="carousel">
                <Carousel />
            </section>

            <section className="landing-register">
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" onClick={() => navigate("/register")} />
                </div>
            </section>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
};

export default LandingPage;
