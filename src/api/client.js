import axios from "axios";
import { NOVI_BASE_URL } from "../constants/urls.js";

const client = axios.create({
    baseURL: NOVI_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default client;
