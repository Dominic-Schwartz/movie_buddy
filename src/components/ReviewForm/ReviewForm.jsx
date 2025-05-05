import PropTypes from "prop-types";
import styles from "./ReviewForm.module.css";
import Button from "../Button/Button";

const ReviewForm = ({ onSubmit, onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.reviewText.value.trim();
        if (text) {
            onSubmit(text);
            onCancel();
        }
    };

    return (
        <div className={styles.backdrop} onClick={onCancel}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h3 className={styles.title}>Plaats je review</h3>

                    <textarea
                        name="reviewText"
                        placeholder="Wat vond je van de film?"
                        required
                        className={styles.textarea}
                    />

                    <div className={styles.buttonGroup}>
                        <Button
                            text="Annuleren"
                            onClick={onCancel}
                            variant="review"
                        />
                        <Button
                            text="Plaats review"
                            type="submit"
                            variant="review"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

ReviewForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ReviewForm;
