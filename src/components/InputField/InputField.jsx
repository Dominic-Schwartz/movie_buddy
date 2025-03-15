import { useState } from "react";
import PropTypes from "prop-types";
import PasswordToggle from "../PasswordToggle/PasswordToggle";
import "./InputField.css";

const InputField = ({
                        type,
                        placeholder,
                        value,
                        onChange,
                        className = "",
                        showToggle = false,
                    }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggle = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`input-field-container ${className}`}>
            <input
                type={type === "password" && isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onInput={handleInputChange}
                className="input-field"
            />
            {type === "password" && showToggle && (
                <PasswordToggle isVisible={isPasswordVisible} onToggle={handleToggle} />
            )}
        </div>
    );
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    showToggle: PropTypes.bool,
};

export default InputField;
