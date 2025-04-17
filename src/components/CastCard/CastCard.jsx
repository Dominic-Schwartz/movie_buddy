import PropTypes from "prop-types";
import styles from "./CastCard.module.css";

const CastCard = ({ actor }) => {
    const { name, character, profile_path } = actor;

    const imageUrl = profile_path
        ? `https://image.tmdb.org/t/p/w185${profile_path}`
        : "/assets/images/placeholder-profile.png"; // fallback

    return (
        <div className={styles.castCard}>
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={name} />
            </div>
            <div className={styles.info}>
                <p className={styles.actorName}>{name}</p>
                <p className={styles.characterName}>{character}</p>
            </div>
        </div>
    );
};

CastCard.propTypes = {
    actor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
        profile_path: PropTypes.string,
    }).isRequired,
};

export default CastCard;
