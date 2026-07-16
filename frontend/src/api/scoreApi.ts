export type LeaderboardEntry = {
	id: number;
	pseudo: string;
	score: number;
};

export type Score = {
	id: number;
	player_id: number;
	score: number;
	duration: number;
	created_at: string;
};

const API_URL = "http://localhost:3310/api/scores";

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
	const response = await fetch(`${API_URL}/leaderboard`);

	if (!response.ok) {
		throw new Error("Impossible de récupérer le classement.");
	}

	return await response.json();
}

export async function createScore(
	playerId: number,
	score: number,
	duration: number,
): Promise<Score> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			playerId,
			score,
			duration,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(
			errorData.message ??
				"Impossible d'enregistrer le score.",
		);
	}

	return await response.json();
}