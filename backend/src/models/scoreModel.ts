import type { ResultSetHeader, RowDataPacket } from "mysql2";

import pool from "../config/database.js";

export type Score = RowDataPacket & {
	id: number;
	player_id: number;
	score: number;
	duration: number;
	created_at: Date;
};

export type LeaderboardEntry = RowDataPacket & {
	id: number;
	pseudo: string;
	score: number;
};

export async function findAllScores(): Promise<Score[]> {
	const [rows] = await pool.query<Score[]>(
		`
			SELECT id, player_id, score, duration, created_at
			FROM scores
			ORDER BY created_at DESC
		`,
	);

	return rows;
}

export async function findScoreById(
	scoreId: number,
): Promise<Score | null> {
	const [rows] = await pool.query<Score[]>(
		`
			SELECT id, player_id, score, duration, created_at
			FROM scores
			WHERE id = ?
		`,
		[scoreId],
	);

	return rows[0] ?? null;
}

export async function insertScore(
	playerId: number,
	score: number,
	duration: number,
): Promise<number> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			INSERT INTO scores (player_id, score, duration)
			VALUES (?, ?, ?)
		`,
		[playerId, score, duration],
	);

	return result.insertId;
}

export async function updateScoreById(
	scoreId: number,
	score: number,
	duration: number,
): Promise<boolean> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			UPDATE scores
			SET score = ?, duration = ?
			WHERE id = ?
		`,
		[score, duration, scoreId],
	);

	return result.affectedRows > 0;
}

export async function deleteScoreById(
	scoreId: number,
): Promise<boolean> {
	const [result] = await pool.execute<ResultSetHeader>(
		`
			DELETE FROM scores
			WHERE id = ?
		`,
		[scoreId],
	);

	return result.affectedRows > 0;
}

export async function findLeaderboard(): Promise<LeaderboardEntry[]> {
	const [rows] = await pool.query<LeaderboardEntry[]>(
		`
			SELECT
				p.id,
				p.pseudo,
				MAX(s.score) AS score
			FROM players AS p
			INNER JOIN scores AS s
				ON s.player_id = p.id
			GROUP BY p.id, p.pseudo
			ORDER BY score DESC
			LIMIT 10
		`,
	);

	return rows;
}