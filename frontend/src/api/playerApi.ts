export type Player = {
	id: number;
	pseudo: string;
	created_at: string;
	updated_at: string;
};

const API_URL = "http://localhost:3310/api/players";

export async function createPlayer(
	pseudo: string,
): Promise<Player> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			pseudo,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(
			errorData.message ??
				"Impossible de créer le joueur.",
		);
	}

	return await response.json();
}

export async function updatePlayer(
	playerId: number,
	pseudo: string,
): Promise<Player> {
	const response = await fetch(`${API_URL}/${playerId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			pseudo,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(
			errorData.message ??
				"Impossible de modifier le joueur.",
		);
	}

	return await response.json();
}

export async function deletePlayer(
	playerId: number,
): Promise<void> {
	const response = await fetch(`${API_URL}/${playerId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(
			errorData.message ??
				"Impossible de supprimer le joueur.",
		);
	}
}