import express from "express";

import {
    quickPrediction,
    detailedPrediction
} from "../controllers/prediction.controllers.js";

const router = express.Router();

router.post(
    "/quick",
    quickPrediction
);

router.post(
    "/detailed",
    detailedPrediction
);

export default router;