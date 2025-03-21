import PropTypes from "prop-types";
import "./SearchIconButton.css";
import searchIcon from "../../assets/svgs/search.svg";

const SearchIconButton = ({ onClick }) => {
    return (
        <button type="button" className="search-icon-button" onClick={onClick}>
            <img src={searchIcon} alt="Search icon" />
        </button>
    );
};

SearchIconButton.propTypes = {
    onClick: PropTypes.func,
};

SearchIconButton.defaultProps = {
    onClick: () => {},
};

export default SearchIconButton;
