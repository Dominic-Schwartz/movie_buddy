import PropTypes from "prop-types";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import "./InputGroup.css";

const InputGroup = ({ placeholder, buttonText }) => {
    return (

        <div className="input-group">
            <InputField type="email" placeholder={placeholder} onChange={() => {}} />
            <Button text={buttonText} variant="register" />
        </div>
    );
};

InputGroup.propTypes = {
    placeholder: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default InputGroup;
