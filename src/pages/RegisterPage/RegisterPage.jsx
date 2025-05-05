import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import PasswordStrengthIndicator from "../../components/PasswordStrengthIndicator/PasswordStrengthIndicator";
import MessagePopup from "../../components/MessagePopup/MessagePopup.jsx";
import TermsPrivacyPopup from "../../components/TermsPrivacyPopup/TermsPrivacyPopup";
import TermsCheckbox from "../../components/TermsCheckbox/TermsCheckbox";
import useRegister from "../../hooks/useRegister";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
    const location = useLocation();
    const prefillEmail = location.state?.email || "";

    const {
        email,
        setEmail,
        password,
        setPassword,
        isAccepted,
        setIsAccepted,
        error,
        setError,
        loading,
        handleRegister,
        passwordStrength
    } = useRegister(prefillEmail);

    const [popup, setPopup] = useState({ open: false, content: "" });

    const openPopup = (type) => {
        setPopup({ open: true, content: type });
    };

    const closePopup = () => {
        setPopup({ open: false, content: "" });
    };

    return (
        <form className={styles.authContainer} onSubmit={handleRegister}>
            {error && <MessagePopup message={error} onClose={() => setError("")} />}
            {popup.open && (
                <TermsPrivacyPopup
                    isOpen={popup.open}
                    onClose={closePopup}
                    contentType={popup.content}
                />
            )}

            <div className={styles.authLeft}>
                <div className={styles.logoContainer}>
                    <p className={styles.logo}>
                        <Link to="/">MOVIE BUDDY</Link>
                    </p>
                </div>

                <div className={styles.registerContainer}>
                    <h2>Meld je gratis aan</h2>

                    <InputField
                        type="email"
                        placeholder="E-mailadres"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showToggle
                    />

                    {password.length > 0 && (
                        <PasswordStrengthIndicator strength={passwordStrength} />
                    )}

                    <TermsCheckbox
                        isAccepted={isAccepted}
                        setIsAccepted={setIsAccepted}
                        openPopup={openPopup}
                    />

                    <Button
                        text={loading ? "Bezig met registreren..." : "Aanmelden"}
                        variant="login"
                        type="submit"
                        disabled={loading}
                    />

                    <p className={styles.loginLink}>
                        Heb je al een Movie Buddy account?{" "}
                        <Link to="/login">Dan kun je hier inloggen.</Link>
                    </p>
                </div>
            </div>

            <div className={styles.authRight}></div>
        </form>
    );
};

export default RegisterPage;
