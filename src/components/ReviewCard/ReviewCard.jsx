import PropTypes from "prop-types";
import userPlaceholder from "../../assets/svgs/user.svg";
import ThumbsUpIcon from "../../assets/svgs/thumbs-up.svg";
import ThumbsDownIcon from "../../assets/svgs/thumbs-down.svg";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({
                        username,
                        text,
                        date,
                        reaction,
                        onShowAll,
                        avatar,
                    }) => {
    const ReactionIcon =
        reaction === "like"
            ? ThumbsUpIcon
            : reaction === "dislike"
                ? ThumbsDownIcon
                : null;

    return (
        <div className={styles.reviewCard}>
            <header className={styles.header}>
                <img
                    src={avatar || userPlaceholder}
                    alt={avatar ? `${username}'s avatar` : "default user icon"}
                    className={`${styles.avatarImg} ${!avatar ? styles.whiteSvg : ""}`}
                />
                <span className={styles.username}>{username}</span>
            </header>

            <div className={styles.body}>
                <p>{text}</p>
            </div>

            <footer className={styles.footer}>
                <div className={styles.meta}>
                    {ReactionIcon && (
                        <img
                            src={ReactionIcon}
                            alt={reaction}
                            className={styles.reactionIcon}
                        />
                    )}
                    <span className={styles.date}>{date}</span>
                </div>

                {onShowAll && (
                    <button className={styles.showAll} onClick={onShowAll}>
                        toon alles
                    </button>
                )}
            </footer>
        </div>
    );
};

ReviewCard.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reaction: PropTypes.oneOf(["like", "dislike"]).isRequired,
    onShowAll: PropTypes.func,          // optioneel, alleen nodig als je de "toon alles"-knop gebruikt
};

ReviewCard.defaultProps = {
    onShowAll: null,                    // geen callback = geen knop = geen warning
};

export default ReviewCard;
