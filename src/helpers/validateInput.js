import { isValidEmail } from "./emailValidation";

export function measurePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

export function validateInput(email, password, isAccepted, passwordStrength) {
    if (!isValidEmail(email)) return false;
    if (passwordStrength < 2) return false;
    return isAccepted;

}
