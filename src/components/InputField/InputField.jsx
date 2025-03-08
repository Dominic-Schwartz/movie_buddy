import { useState } from "react";
import PropTypes from "prop-types";
import PasswordToggle from "../PasswordToggle/PasswordToggle";
import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, className }) => {
    const [internalValue, setInternalValue] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggle = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!onChange) {
            setInternalValue(newValue);
        } else {
            onChange(newValue);
        }
    };

    return (
        <div className={`input-field-container ${className ? className : ""}`}>
            <input
                type={type === "password" && isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value ?? internalValue}
                onChange={handleChange}
                className="input-field"
            />
            {type === "password" && (
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
};

export default InputField;
