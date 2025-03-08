import { useLocation } from "react-router-dom";
import "./RegisterPage.css";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";

const RegisterPage = () => {
    const location = useLocation();
    const prefillEmail = location.state?.email || "";

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="logo-container">
                    <p className="logo">
                        <a href="/">MOVIE BUDDY</a>
                    </p>
                </div>
                <div className="register-container">
                    <h2>Meld je gratis aan</h2>
                    <InputField
                        type="email"
                        placeholder="E-mailadres"
                        value={prefillEmail}
                        onChange={() => {}}
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                        showToggle
                    />
                    <div className="terms">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            Ik ga akkoord met de <strong>gebruikersvoorwaarden</strong> en <strong>privacyverklaring</strong>
                        </label>
                    </div>
                    <Button text="Aanmelden" />
                    <p className="login-link">
                        Heb je al een Movie Buddy account?{" "}
                        <a href="/login">Dan kun je hier inloggen.</a>
                    </p>
                </div>
            </div>
            <div className="auth-right"></div>
        </div>
    );
};

export default RegisterPage;
