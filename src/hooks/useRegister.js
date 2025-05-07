import { useState } from "react";
import { registerUser } from "../helpers/api.js";
import { validateInput, measurePasswordStrength } from "../helpers/validateInput";

const useRegister = (initialEmail = "") => {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordStrength = measurePasswordStrength(password);

    const handleRegister = async (event) => {
        event.preventDefault();

        setError("");

        if (!validateInput(email, password, isAccepted, passwordStrength)) {
            setError(
                "Controleer je invoer: vul een geldig e-mailadres, " +
                "een sterk wachtwoord in en accepteer de voorwaarden."
            );
            return;
        }

        setLoading(true);

        const username = email.split("@")[0];
        const result = await registerUser(email, password, username);

        setLoading(false);

        if (result.success) {
            setError("Registratie succesvol! Je wordt doorgestuurd...");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            setError(result.message);
        }


    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isAccepted,
        setIsAccepted,
        error,
        setError,
        loading,
        passwordStrength,
        handleRegister,
    };
};

export default useRegister;
