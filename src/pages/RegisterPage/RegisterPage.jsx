import "./RegisterPage.css";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField.jsx";

const RegisterPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Meld je gratis aan</h2>

                <InputField type="email" placeholder="E-mailadres" />
                <InputField type="password" placeholder="Wachtwoord" showToggle />

                <div className="terms">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        Ik ga akkoord met de <strong>gebruikersvoorwaarden</strong> en <strong>privacyverklaring</strong>
                    </label>
                </div>

                <Button text="Aanmelden" />

                <p className="login-link">
                    Heb je al een Movie Buddy account? <strong>Hier inloggen.</strong>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;