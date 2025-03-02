import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, variant }) => {
    return (
        <div className={`input-field-container ${variant}`}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
            />
        </div>
    );
};

export default InputField;