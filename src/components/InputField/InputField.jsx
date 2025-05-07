import { useState } from "react";
import PropTypes from "prop-types";
import PasswordToggle from "../PasswordToggle/PasswordToggle";
import SearchIcon from "../SearchIcon/SearchIcon.jsx";
import styles from "./InputField.module.css";

const InputField = ({
                        type,
                        placeholder,
                        value,
                        onChange,
                        onKeyDown,
                        className = "",
                        showToggle = false,
                        showSearchIcon = false,
                        onSearchIconClick,
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

    const containerClassNames = [
        styles.inputFieldContainer,
        showSearchIcon ? styles.search : "",
        className
    ].join(" ").trim();

    return (
        <div className={containerClassNames}>
            <input
                type={type === "password" && isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                className={`${styles.inputField} ${className}`}
            />

            {type === "password" && showToggle && (
                <PasswordToggle isVisible={isPasswordVisible} onToggle={handleToggle} />
            )}

            {showSearchIcon && <SearchIcon onClick={onSearchIconClick} />}
        </div>
    );
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    className: PropTypes.string,
    showToggle: PropTypes.bool,
    showSearchIcon: PropTypes.bool,
    onSearchIconClick: PropTypes.func,
};

export default InputField;