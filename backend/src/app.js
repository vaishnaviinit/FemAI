import express from "express";
import cors from "cors";

import predictionRoutes from "./routes/prediction.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "FemAI API Gateway Running"
    });
});

app.use(
    "/api/v1/predictions",
    predictionRoutes
);

export default app;