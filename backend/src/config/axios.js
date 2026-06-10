import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.ML_SERVICE_URL,
    timeout: 10000
});

export default axiosInstance;