import { useState } from "react";
import "./PasswordToggle.css";
import EyeOpen from "../../assets/svgs/eye-open.svg";
import EyeClosed from "../../assets/svgs/eye-close.svg";

const PasswordToggle = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <button type="button" className="password-toggle" onClick={() => setIsVisible(!isVisible)}>
            <img src={isVisible ? EyeOpen : EyeClosed} alt="Toon wachtwoord" />
        </button>
    );
};

export default PasswordToggle;
