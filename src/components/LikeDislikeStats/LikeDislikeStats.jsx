import PropTypes from "prop-types";
import styles from "./LikeDislikeStats.module.css";

const LikeDislikeStats = ({ percentage, type, showLabel = false }) => {
    return (
        <div>
            <span className={styles.percentage}>{percentage}%</span>
            {showLabel && (
                <span className={styles.label}>{type}</span>
            )}
        </div>
    );
};

LikeDislikeStats.propTypes = {
    percentage: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["likes", "dislikes"]).isRequired,
    showLabel: PropTypes.bool,
};


export default LikeDislikeStats;
