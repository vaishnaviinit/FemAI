import axiosInstance from "../config/axios.js";

export const quickPredictionService = async (patientData) => {
    const response = await axiosInstance.post(
        "/predict/quick",
        patientData
    );

    return response.data;
};

export const detailedPredictionService = async (patientData) => {
    const response = await axiosInstance.post(
        "/predict/detailed",
        patientData
    );

    return response.data;
};