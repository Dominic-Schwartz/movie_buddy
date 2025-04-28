import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchMoviesByQuery } from "../../helpers/fetchMovies";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import UserIcon from "../UserIcon/UserIcon";
import AvatarPicker from "../AvatarPicker/AvatarPicker";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const menuWrapperRef = useRef(null);
    const searchWrapperRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogoClick = () => {
        if (location.pathname === "/home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/home");
        }
    };

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim().length >= 2) {
            try {
                const response = await fetchMoviesByQuery(value);
                setSuggestions(response.slice(0, 5));
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setSuggestions([]); // sluit suggesties
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
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
                    <div ref={searchWrapperRef} className={styles.searchWrapper}>
                        <InputField
                            type="text"
                            placeholder="Zoeken"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                            className="search"
                            showSearchIcon
                            onSearchIconClick={handleSearch}
                        />
                        {suggestions.length > 0 && (
                            <div className={styles.suggestionsBox}>
                                {suggestions.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className={styles.suggestionItem}
                                        onClick={() => {
                                            setSuggestions([]);
                                            navigate(`/movie/${movie.id}`);
                                        }}
                                    >
                                        {movie.title}
                                    </div>
                                ))}
                            </div>
                        )}
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
