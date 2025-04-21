import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { isValidEmail } from "../../helpers/emailValidation";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import styles from "./InputGroup.module.css";

const InputGroup = ({ placeholder, buttonText }) => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleButtonClick = () => {
        if (!email) {
            setErrorMessage("Vul je e-mailadres in.");
        } else if (!isValidEmail(email)) {
            setErrorMessage("Voer een geldig e-mailadres in.");
        } else {
            setErrorMessage("");
            navigate("/register", { state: { email } });
        }
    };

    return (
        <>
            <div className={styles.inputGroup}>
                <InputField
                    type="email"
                    placeholder={placeholder}
                    className={styles.inputFieldGroup}
                    value={email}
                    onChange={handleEmailChange}
                />
                <Button
                    text={buttonText}
                    variant="register"
                    disabled={!isValidEmail(email)}
                    onClick={handleButtonClick}
                />
            </div>
            {errorMessage && (
                <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
            )}
        </>
    );
};

InputGroup.propTypes = {
    placeholder: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default InputGroup;