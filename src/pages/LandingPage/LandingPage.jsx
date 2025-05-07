import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputGroup from "../../components/InputGroup/InputGroup";
import SlideShowCarousel from "../../components/SlideShowCarousel/SlideShowCarousel.jsx";
import Footer from "../../components/Footer/Footer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.landingMain}>
            <div className={styles.landingHeader}>
                <div className={styles.landingHeaderContent}>
                    <p className={styles.logoOnly}>MOVIE BUDDY</p>
                    <Button text="Inloggen" variant="landingLogin" onClick={() => navigate("/login")} />
                </div>
            </div>

            <header className={styles.heroSection}>
                <h1>Alles wat je moet weten over je favoriete films op één plek</h1>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <InputGroup
                    placeholder="E-mailadres"
                    buttonText="Registreren"
                    onClick={(email) => navigate("/register", { state: { email } })} />
            </header>

            <section className={styles.featuresSection}>
                <h2>Wat heeft Movie Buddy jou te bieden?</h2>
                <p>Ontdek de nieuwste films, bekijk trailers en lees uitgebreide informatie over je favorieten.</p>
            </section>

            <SlideShowCarousel />

            <section className={styles.registerSection}>
                <p>Maak een account aan en stel jouw persoonlijke watchlist samen – gratis en eenvoudig!</p>
                <InputGroup
                    placeholder="E-mailadres"
                    buttonText="Registreren"
                    onClick={(email) => navigate("/register", { state: { email } })} />
            </section>

            <Footer />

        </div>
    );
};

export default LandingPage;