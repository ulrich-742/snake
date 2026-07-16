import type { Request, Response } from "express";

import {
	createPlayer,
	getPlayer,
	getPlayers,
	removePlayer,
	updatePlayer,
} from "../services/playerService.js";

export async function readPlayers(
	_request: Request,
	response: Response,
) {
	const players = await getPlayers();

	response.status(200).json(players);
}

export async function readPlayer(
	request: Request,
	response: Response,
) {
	const playerId = Number(request.params.id);

	const player = await getPlayer(playerId);

	if (!player) {
		response.status(404).json({
			message: "Joueur introuvable.",
		});

		return;
	}

	response.status(200).json(player);
}

export async function addPlayer(
	request: Request,
	response: Response,
) {
	try {
		const { pseudo } = request.body;

		const player = await createPlayer(pseudo);

		response.status(201).json(player);
	} catch (error) {
		response.status(400).json({
			message: error instanceof Error ? error.message : "Erreur.",
		});
	}
}

export async function editPlayer(
	request: Request,
	response: Response,
) {
	try {
		const playerId = Number(request.params.id);
		const { pseudo } = request.body;

		const player = await updatePlayer(playerId, pseudo);

		if (!player) {
			response.status(404).json({
				message: "Joueur introuvable.",
			});

			return;
		}

		response.status(200).json(player);
	} catch (error) {
		response.status(400).json({
			message: error instanceof Error ? error.message : "Erreur.",
		});
	}
}

export async function deletePlayer(
	request: Request,
	response: Response,
) {
	const playerId = Number(request.params.id);

	const deleted = await removePlayer(playerId);

	if (!deleted) {
		response.status(404).json({
			message: "Joueur introuvable.",
		});

		return;
	}

	response.sendStatus(204);
}