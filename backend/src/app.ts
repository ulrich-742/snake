import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import playerRouter from "./routes/playerRoutes.js";
import scoreRouter from "./routes/scoreRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
	response.status(200).json({
		status: "ok",
		message: "Backend Snake is running.",
	});
});

app.use("/api/players", playerRouter);
app.use("/api/scores", scoreRouter);

export default app;
