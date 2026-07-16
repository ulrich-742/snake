import { findPlayerById } from "../models/playerModel.js";
import {
	deleteScoreById,
	findAllScores,
	findLeaderboard,
	findScoreById,
	insertScore,
	updateScoreById,
} from "../models/scoreModel.js";

export async function getScores() {
	return await findAllScores();
}

export async function getScore(scoreId: number) {
	return await findScoreById(scoreId);
}

export async function getLeaderboard() {
	return await findLeaderboard();
}

export async function createScore(
	playerId: number,
	score: number,
	duration: number,
) {
	const player = await findPlayerById(playerId);

	if (!player) {
		throw new Error("Joueur introuvable.");
	}

	const scoreId = await insertScore(playerId, score, duration);

	return await findScoreById(scoreId);
}

export async function updateScore(
	scoreId: number,
	score: number,
	duration: number,
) {
	const updated = await updateScoreById(scoreId, score, duration);

	if (!updated) {
		return null;
	}

	return await findScoreById(scoreId);
}

export async function removeScore(scoreId: number) {
	return await deleteScoreById(scoreId);
}
