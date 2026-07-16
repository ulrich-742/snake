import {
	deletePlayerById,
	findAllPlayers,
	findPlayerById,
	findPlayerByPseudo,
	insertPlayer,
	updatePlayerById,
} from "../models/playerModel.js";

export class ValidationError extends Error {}
export class NotFoundError extends Error {}

const PSEUDO_MIN_LENGTH = 3;
const PSEUDO_MAX_LENGTH = 20;

function normalizePseudo(pseudo: string): string {
	const normalized = pseudo.trim();

	if (!normalized) {
		throw new ValidationError("Le pseudo est obligatoire.");
	}

	if (
		normalized.length < PSEUDO_MIN_LENGTH ||
		normalized.length > PSEUDO_MAX_LENGTH
	) {
		throw new ValidationError(
			`Le pseudo doit contenir entre ${PSEUDO_MIN_LENGTH} et ${PSEUDO_MAX_LENGTH} caractères.`,
		);
	}

	return normalized;
}

async function assertPseudoIsAvailable(
	pseudo: string,
	excludePlayerId?: number,
) {
	const existing = await findPlayerByPseudo(pseudo);

	if (existing && existing.id !== excludePlayerId) {
		throw new ValidationError("Ce pseudo est déjà utilisé.");
	}
}

export async function getPlayers() {
	return await findAllPlayers();
}

export async function getPlayer(playerId: number) {
	const player = await findPlayerById(playerId);

	if (!player) {
		throw new NotFoundError("Joueur introuvable.");
	}

	return player;
}

export async function createPlayer(pseudo: string) {
	const normalizedPseudo = normalizePseudo(pseudo);

	await assertPseudoIsAvailable(normalizedPseudo);

	const playerId = await insertPlayer(normalizedPseudo);

	return await findPlayerById(playerId);
}

export async function updatePlayer(playerId: number, pseudo: string) {
	const normalizedPseudo = normalizePseudo(pseudo);

	await assertPseudoIsAvailable(normalizedPseudo, playerId);

	const updated = await updatePlayerById(playerId, normalizedPseudo);

	if (!updated) {
		throw new NotFoundError("Joueur introuvable.");
	}

	return await findPlayerById(playerId);
}

export async function removePlayer(playerId: number) {
	const deleted = await deletePlayerById(playerId);

	if (!deleted) {
		throw new NotFoundError("Joueur introuvable.");
	}

	return deleted;
}
