import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import "./InputGroup.css";

const InputGroup = ({ placeholder, buttonText }) => {
    return (
        <div className="input-group">
            <InputField type="email" placeholder={placeholder} />
            <Button text={buttonText} variant="register" />
        </div>
    );
};

export default InputGroup;