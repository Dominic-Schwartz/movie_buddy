import PropTypes from "prop-types";
import styles from "./SearchIcon.module.css";
import searchIcon from "../../assets/svgs/search.svg";

const SearchIcon = ({ onClick }) => {
    return (
        <button type="button" className={styles.searchIconButton} onClick={onClick}>
            <img src={searchIcon} alt="Search icon" />
        </button>
    );
};

SearchIcon.propTypes = {
    onClick: PropTypes.func,
};

SearchIcon.defaultProps = {
    onClick: () => {},
};

export default SearchIcon;
