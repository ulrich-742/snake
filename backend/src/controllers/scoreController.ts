import type { Request, Response } from "express";

import {
	createScore,
	getLeaderboard,
	getScore,
	getScores,
	removeScore,
	updateScore,
} from "../services/scoreService.js";

export async function readScores(
	_request: Request,
	response: Response,
) {
	const scores = await getScores();

	response.status(200).json(scores);
}

export async function readScore(
	request: Request,
	response: Response,
) {
	const scoreId = Number(request.params.id);

	const score = await getScore(scoreId);

	if (!score) {
		response.status(404).json({
			message: "Score introuvable.",
		});

		return;
	}

	response.status(200).json(score);
}

export async function readLeaderboard(
	_request: Request,
	response: Response,
) {
	const leaderboard = await getLeaderboard();

	response.status(200).json(leaderboard);
}

export async function addScore(
	request: Request,
	response: Response,
) {
	try {
		const { playerId, score, duration } = request.body;

		const newScore = await createScore(
			playerId,
			score,
			duration,
		);

		response.status(201).json(newScore);
	} catch (error) {
		response.status(400).json({
			message:
				error instanceof Error
					? error.message
					: "Erreur.",
		});
	}
}

export async function editScore(
	request: Request,
	response: Response,
) {
	try {
		const scoreId = Number(request.params.id);
		const { score, duration } = request.body;

		const updatedScore = await updateScore(
			scoreId,
			score,
			duration,
		);

		if (!updatedScore) {
			response.status(404).json({
				message: "Score introuvable.",
			});

			return;
		}

		response.status(200).json(updatedScore);
	} catch (error) {
		response.status(400).json({
			message:
				error instanceof Error
					? error.message
					: "Erreur.",
		});
	}
}

export async function deleteScore(
	request: Request,
	response: Response,
) {
	const scoreId = Number(request.params.id);

	const deleted = await removeScore(scoreId);

	if (!deleted) {
		response.status(404).json({
			message: "Score introuvable.",
		});

		return;
	}

	response.sendStatus(204);
}