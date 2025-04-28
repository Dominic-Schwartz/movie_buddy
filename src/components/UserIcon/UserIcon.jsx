import PropTypes from "prop-types";
import { useAvatar } from "../../hooks/useAvatar";
import styles from "./UserIcon.module.css";
import userIcon from "../../assets/svgs/user.svg";

const UserIcon = ({ onClick }) => {
    const avatarData = useAvatar() || {};
    const { avatar } = avatarData;
    const isCustomAvatar = Boolean(avatar);

    return (
        <button type="button" className={styles.userIconButton} onClick={onClick}>
            <img
                src={avatar || userIcon}
                alt="User Icon"
                className={isCustomAvatar ? styles.avatarImage : styles.userIconImage}
            />
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
