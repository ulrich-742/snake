import {
	deletePlayerById,
	findAllPlayers,
	findPlayerById,
	findPlayerByPseudo,
	insertPlayer,
	updatePlayerById,
} from "../models/playerModel.js";

export async function getPlayers() {
	return await findAllPlayers();
}

export async function getPlayer(playerId: number) {
	return await findPlayerById(playerId);
}

export async function createPlayer(pseudo: string) {
	const normalizedPseudo = pseudo.trim();

	if (!normalizedPseudo) {
		throw new Error("Le pseudo est obligatoire.");
	}

	const existingPlayer = await findPlayerByPseudo(normalizedPseudo);

	if (existingPlayer) {
		throw new Error("Ce pseudo existe déjà.");
	}

	const playerId = await insertPlayer(normalizedPseudo);

	return await findPlayerById(playerId);
}

export async function updatePlayer(
	playerId: number,
	pseudo: string,
) {
	const normalizedPseudo = pseudo.trim();

	if (!normalizedPseudo) {
		throw new Error("Le pseudo est obligatoire.");
	}

	const updated = await updatePlayerById(
		playerId,
		normalizedPseudo,
	);

	if (!updated) {
		return null;
	}

	return await findPlayerById(playerId);
}

export async function removePlayer(playerId: number) {
	return await deletePlayerById(playerId);
}