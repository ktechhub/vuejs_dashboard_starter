import axios from "axios";
import baseUrl from "../../config/baseUrl";
const instance = axios.create({
    baseURL: baseUrl(),
    headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
    },
});
export default instance;