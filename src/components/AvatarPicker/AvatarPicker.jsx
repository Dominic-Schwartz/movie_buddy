import PropTypes from "prop-types";
import styles from "./AvatarPicker.module.css";
import { useAvatar } from "../../hooks/useAvatar";

const avatarOptions = [
    "/src/assets/avatars/avatar1.png",
    "/src/assets/avatars/avatar2.png",
    "/src/assets/avatars/avatar3.png",
    "/src/assets/avatars/avatar4.png",
    "/src/assets/avatars/avatar5.png",
    "/src/assets/avatars/avatar6.png",
];

const AvatarPicker = ({ onClose }) => {
    const { avatar, chooseAvatar, removeAvatar } = useAvatar();

    const handleAvatarClick = (url) => {
        if (url === avatar) {
            removeAvatar();
        } else {
            chooseAvatar(url);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <h3>Kies jouw Avatar</h3>
                <div className={styles.avatarGrid}>
                    {avatarOptions.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Avatar ${index + 1}`}
                            className={`${styles.avatar} ${url === avatar ? styles.active : ""}`}
                            onClick={() => handleAvatarClick(url)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

AvatarPicker.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AvatarPicker;
