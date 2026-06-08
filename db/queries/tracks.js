import db from "../client.js";

export async function getTracks() {
  const { rows } = await db.query("SELECT * FROM tracks;");
  return rows;
}

export async function getTrackById(id) {
  const { rows } = await db.query("SELECT * FROM tracks WHERE id = $1;", [id]);
  return rows[0];
}
