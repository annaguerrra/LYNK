import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

const { logout } = useAuth();

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_API
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {
            logout();
        }

        return Promise.reject(error);
    }
);

export default api;