import PropTypes from "prop-types";
import "./UserIcon.css";
import userIcon from "../../assets/svgs/user.svg";

const UserIcon = ({ onClick }) => {
    return (
        <button type="button" className="user-icon-button" onClick={onClick}>
            <img src={userIcon} alt="User Icon" />
        </button>
    );
};

UserIcon.propTypes = {
    onClick: PropTypes.func,
};

UserIcon.defaultProps = {
    onClick: () => {},
};

export default UserIcon;
