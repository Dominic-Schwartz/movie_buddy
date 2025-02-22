import Button from "../../components/Button/Button";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="header-top">
                    {/* Logo linksboven */}
                    <div className="logo">
                        <p>[Hier komt het Movie Buddy logo]</p>
                    </div>

                    {/* Inlogbutton rechtsboven */}
                    <Button text="Inloggen" className="login-button" />
                </div>

                <h1>Alles wat je moet weten over je favoriete films op één plek</h1>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>

                {/* Invoervelden component komt hier */}
                <div className="landing-input-group">
                    <p>[Hier komt het invoervelden component]</p>
                    <Button text="Registreren" variant="register" />
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

                {/* Tweede invoervelden component komt hier */}
                <div className="landing-input-group">
                    <p>[Hier komt het invoervelden component]</p>
                    <Button text="Registreren" variant="register" />
                </div>
            </section>

            <footer className="landing-footer">
                <p>Powered by The Movie Database (TMDb)</p>
                <p>Gebruikersvoorwaarden & Privacyverklaring</p>
                <div className="social-icons">
                    <p>[Hier komen social media iconen]</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;