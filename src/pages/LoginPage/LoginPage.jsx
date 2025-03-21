import "./LoginPage.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="auth-container">

            <div className="auth-left">

                <div className="logo-container">
                    <p className="logo">
                        <a href="/">MOVIE BUDDY</a>
                    </p>
                </div>

                <div className="login-container">
                    <h2>Inloggen</h2>

                    <InputField
                        type="email"
                        placeholder="E-mailadres" />
                    <InputField type="password" placeholder="Wachtwoord" />
                    <Button text="Inloggen" variant="default" />
                    <p className="forgot-password">Wachtwoord vergeten?</p>
                    <p className="register-link">
                    Nog geen Movie Buddy account? <a href="/register">Meld je dan hier aan.</a>
                    </p>
                    <Link to="/home">Ga naar HomePage (tijdelijk)</Link>
                </div>

            </div>

            <div className="auth-right"></div>

        </div>
    );
};

export default LoginPage;
