import axios from "axios";

const apiKey = import.meta.env.VITE_NOVI_API_KEY;
import { API_URL } from "../constants/urls.js";

export async function registerUser(email, password) {
    try {
        const response = await axios.post(
            `${API_URL}?api_key=${apiKey}`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
                message: "Registratie succesvol",
            };
        } else {
            return {
                success: false,
                message: "Registratie mislukt",
            };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Er ging iets mis tijdens de registratie",
        };
    }
}

