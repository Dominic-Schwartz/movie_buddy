import client from "../api/client.js";

export async function registerUser(email, password, username) {

    try {
        const response = await client.post("/api/auth/signup", {
            username,
            email,
            password,
            role: ["user"],
        });

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

