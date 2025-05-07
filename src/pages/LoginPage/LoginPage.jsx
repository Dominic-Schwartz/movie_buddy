import { useState } from "react";
import styles from "./LoginPage.module.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MessagePopup from "../../components/MessagePopup/MessagePopup";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onClickForgotPassword = () => {
        setError("Wachtwoord herstellen is momenteel niet beschikbaar.");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Vul je e-mailadres en wachtwoord in.");
            return;
        }

        const cleanUsername = email.split("@")[0];

        const result = await login(cleanUsername, password);
        if (result.success) {
            navigate("/home");
        } else {
            setError(result.message);
        }
    };

    return (
        <form className={styles.authContainer} onSubmit={handleLogin}>
            <div className={styles.authLeft}>
                <div className={styles.logoContainer}>
                    <p className={styles.logo}>
                        <a href="/">MOVIE BUDDY</a>
                    </p>
                </div>

                <div className={styles.loginContainer}>
                    <h2>Inloggen</h2>

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

                    <Button text="Inloggen" variant="login" type="submit" />

                    <p className={styles.forgotPassword} onClick={onClickForgotPassword}>
                        Wachtwoord vergeten?
                    </p>


                    <p className={styles.registerLink}>
                        Nog geen Movie Buddy account? <a href="/register">Meld je dan hier aan.</a>
                    </p>

                    <MessagePopup message={error} type="error" onClose={() => setError("")} />
                </div>
            </div>

            <div className={styles.authRight}></div>
        </form>
    );
};

export default LoginPage;
