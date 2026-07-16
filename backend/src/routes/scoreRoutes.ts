import { Router } from "express";

import {
	addScore,
	deleteScore,
	editScore,
	readLeaderboard,
	readScore,
	readScores,
} from "../controllers/scoreController.js";

const scoreRouter = Router();

scoreRouter.get("/", readScores);
scoreRouter.get("/leaderboard", readLeaderboard);
scoreRouter.get("/:id", readScore);

scoreRouter.post("/", addScore);
scoreRouter.put("/:id", editScore);
scoreRouter.delete("/:id", deleteScore);

export default scoreRouter;