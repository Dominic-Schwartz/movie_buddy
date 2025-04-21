import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import UserIcon from "../UserIcon/UserIcon.jsx";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogoClick = () => {
        if (location.pathname === "/home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/home");
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        console.log("Zoeken naar:", searchTerm);
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarLeft}>
                    <div className={styles.logo} onClick={handleLogoClick}>
                        <span className={styles.logoText}>MOVIE BUDDY</span>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Button text="Genres" variant="navbar" onClick={() => console.log("Genres")} />
                        <Button text="TOP 10" variant="navbar" onClick={() => console.log("TOP 10")} />
                        <Button text="Watchlist" variant="navbar" onClick={() => console.log("Watchlist")} />
                    </div>
                </div>

                <div className={styles.navbarRight}>
                    <div className={styles.searchWrapper}>
                        <InputField
                            type="text"
                            placeholder="Zoeken"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search"
                            showSearchIcon
                            onSearchIconClick={handleSearch}
                        />
                    </div>

                    <UserIcon
                        onClick={() =>
                        console.log("Gebruikersicoon geklikt")} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;