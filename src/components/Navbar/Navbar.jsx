import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestions";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import UserIcon from "../UserIcon/UserIcon";
import AvatarPicker from "../AvatarPicker/AvatarPicker";
import { GENRE_IDS } from "../../constants/urls";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const isAdmin = user?.roles?.includes("ROLE_ADMIN");

    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isGenresOpen, setIsGenresOpen] = useState(false);

    const { suggestions, updateSuggestions, clearSuggestions } = useSearchSuggestions();
    const isScrolled = useScrollPosition();

    const menuWrapperRef = useRef(null);
    const searchWrapperRef = useRef(null);
    const genresWrapperRef = useRef(null);

    useClickOutside([menuWrapperRef, searchWrapperRef, genresWrapperRef], () => {
        setIsMenuOpen(false);
        setIsPickerOpen(false);
        clearSuggestions();
        setIsGenresOpen(false);
    });

    const handleLogoClick = () => {
        if (location.pathname === "/home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/home");
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        updateSuggestions(value).catch((err) => {
            console.error("❌ Fout bij het ophalen van suggesties:", err);
        });
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            clearSuggestions();
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
                        <div ref={genresWrapperRef} className={styles.buttonGroup}>
                            <Button
                                text="Genres"
                                variant="navbar"
                                onClick={() => setIsGenresOpen(prev => !prev)}
                            />
                            {isGenresOpen && (
                                <div className={styles.genresDropdown}>
                                    {Object.keys(GENRE_IDS).map((genreName) => (
                                        <div
                                            key={genreName}
                                            className={styles.genreItem}
                                            onClick={() => {
                                                setIsGenresOpen(false);
                                                navigate(`/search?genre=${encodeURIComponent(genreName)}`);
                                            }}
                                        >
                                            {genreName.charAt(0).toUpperCase() + genreName.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            text="TOP 10"
                            variant="navbar"
                            onClick={() => navigate("/search?genre=trending&top=true")}
                        />

                        <Button text="Watchlist" variant="navbar" onClick={() => navigate("/watchlist")} />
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
                                            clearSuggestions();
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
                                {isAdmin && (
                                    <Button text="Admin pagina" variant="menu" onClick={() => navigate("/admin")} />
                                )}
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
