import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import UserIconButton from "../UserIconButton/UserIconButton"; // Nieuwe import

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
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="logo" onClick={handleLogoClick}>
                        <span className="logo-text">MOVIE BUDDY</span>
                    </div>

                    <Button text="Genres" className="nav-btn" onClick={() => console.log("Genres")} />
                    <Button text="TOP 10" className="nav-btn" onClick={() => console.log("TOP 10")} />
                    <Button text="Watchlist" className="nav-btn" onClick={() => console.log("Watchlist")} />
                </div>

                <div className="navbar-right">
                    <div className="search-wrapper">
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

                    <UserIconButton onClick={() => console.log("Gebruikersicoon geklikt")} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
