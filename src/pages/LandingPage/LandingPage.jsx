import Button from "../../components/Button/Button";
import InputGroup from "../../components/InputGroup/InputGroup";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-main">

            <nav className="navbar-container">
                <div className="navbar-items">
                <p className="logo">MOVIE BUDDY</p>
                <Button text="Inloggen" />
                </div>
            </nav>

            <header className="header-main">
                <h1>Alles wat je moet weten over je favoriete films op één plek</h1>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" />
                </div>
            </header>

            <section className="landing-features">
                <h2>Wat heeft Movie Buddy jou te bieden?</h2>
                <p>Ontdek de nieuwste films, bekijk trailers en lees uitgebreide informatie over je favorieten.</p>

                {/* Hier komt de carousel component */}
                <p>[Hier komt de Carousel component]</p>
            </section>

            <section className="landing-register">
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>

                <div className="landing-input-group">
                    <InputGroup placeholder="E-mailadres" buttonText="Registreren" />
                </div>
            </section>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
};

export default LandingPage;
