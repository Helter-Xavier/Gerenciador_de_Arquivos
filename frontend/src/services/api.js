import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": null
    }
});

export const createSession = async (email, password) => {
    return api.post('/login', {
        email,
        password
    })
}