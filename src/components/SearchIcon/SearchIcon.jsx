import PropTypes from "prop-types";
import "./SearchIcon.css";
import searchIcon from "../../assets/svgs/search.svg";

const SearchIcon = ({ onClick }) => {
    return (
        <button type="button" className="search-icon-button" onClick={onClick}>
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
