import app from "./app.js";
import pool from "./config/database.js";

const PORT = Number(process.env.APP_PORT) || 3310;

async function startServer() {
	try {
		const connection = await pool.getConnection();

		console.log("✅ Connected to MySQL");

		connection.release();

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("❌ MySQL connection failed");
		console.error(error);

		process.exit(1);
	}
}

startServer();