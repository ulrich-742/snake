import { Router } from "express";

import {
	addPlayer,
	deletePlayer,
	editPlayer,
	readPlayer,
	readPlayers,
} from "../controllers/playerController.js";

const playerRouter = Router();

playerRouter.get("/", readPlayers);
playerRouter.get("/:id", readPlayer);
playerRouter.post("/", addPlayer);
playerRouter.put("/:id", editPlayer);
playerRouter.delete("/:id", deletePlayer);

export default playerRouter;
