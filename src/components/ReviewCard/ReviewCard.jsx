import PropTypes from "prop-types";
import UserIcon from "../../components/UserIcon/UserIcon.jsx";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({
                        username,
                        text,
                        date,
                        reaction,
                        onShowAll,
                    }) => {
    const ReactionIcon = reaction === "like" ? ThumbsUpIcon : ThumbsDownIcon;

    return (
        <div className={styles.reviewCard}>
            <header className={styles.header}>
                <UserIcon />
                <span className={styles.username}>{username}</span>
            </header>

            <div className={styles.body}>
                <p>{text}</p>
            </div>

            <footer className={styles.footer}>
                <div className={styles.meta}>
                    <img src={ReactionIcon} alt={reaction} className={styles.reactionIcon} />
                    <span className={styles.date}>{date}</span>
                </div>
                <button className={styles.showAll} onClick={onShowAll}>
                    toon alles
                </button>
            </footer>
        </div>
    );
};

ReviewCard.propTypes = {
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reaction: PropTypes.oneOf(["like", "dislike"]).isRequired,
    onShowAll: PropTypes.func,
};

ReviewCard.defaultProps = {
    onShowAll: () => {},
};

export default ReviewCard;
