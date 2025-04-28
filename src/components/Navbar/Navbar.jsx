import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import UserIcon from "../UserIcon/UserIcon.jsx";
import AvatarPicker from "../AvatarPicker/AvatarPicker.jsx";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const menuWrapperRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsPickerOpen(false);
            }
        };
        if (isMenuOpen || isPickerOpen) {
            window.addEventListener("mousedown", handleClickOutside);
        } else {
            window.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, isPickerOpen]);

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

    const handleUserIconClick = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
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

                    <div ref={menuWrapperRef} className={styles.userWrapper}>
                        <UserIcon onClick={handleUserIconClick} />
                        {isMenuOpen && (
                            <div className={styles.userMenu}>
                                <Button text="Avatar kiezen" variant="menu" onClick={() => setIsPickerOpen(true)} />
                                <Button text="Watchlist" variant="menu" onClick={() => navigate("/watchlist")} />
                                <Button text="Uitloggen" variant="menu" onClick={handleLogout} />
                            </div>
                        )}
                        {isPickerOpen && (
                            <AvatarPicker onClose={() => setIsPickerOpen(false)} />
                        )}
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
