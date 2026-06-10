import {
    quickPredictionService,
    detailedPredictionService
} from "../services/prediction.services.js";

export const quickPrediction = async (req, res) => {
    try {
        const result = await quickPredictionService(req.body);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Prediction failed"
        });
    }
};

export const detailedPrediction = async (req, res) => {
    try {
        const result = await detailedPredictionService(req.body);

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Prediction failed"
        });
    }
};