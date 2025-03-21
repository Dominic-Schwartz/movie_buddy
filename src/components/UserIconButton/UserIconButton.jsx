import PropTypes from "prop-types";
import "./UserIconButton.css";
import userIcon from "../../assets/svgs/user.svg";

const UserIconButton = ({ onClick }) => {
    return (
        <button type="button" className="user-icon-button" onClick={onClick}>
            <img src={userIcon} alt="User Icon" />
        </button>
    );
};

UserIconButton.propTypes = {
    onClick: PropTypes.func,
};

UserIconButton.defaultProps = {
    onClick: () => {},
};

export default UserIconButton;
