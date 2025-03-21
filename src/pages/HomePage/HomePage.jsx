import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";

const HomePage = () => {
    return (
        <div className="homePage">
            <Navbar />

            {/* Hero-sectie (carousel/trailer) */}
            <section className="hero">
                <h2>Hero / Carousel komt hier</h2>
            </section>

            {/* Contentsecties (horizontale rijen) */}
            <section className="contentRows">
                <h2>Filmrijen komen hier</h2>
            </section>

            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default HomePage;
