import db from "../client.js";

export async function getPlaylists() {
  const { rows } = await db.query("SELECT * FROM playlists;");
  return rows;
}

export async function getPlaylistById(id) {
  const { rows } = await db.query("SELECT * FROM playlists WHERE id = $1;", [
    id,
  ]);
  return rows[0];
}

export async function createPlaylist(name) {
  const { rows } = await db.query(
    "INSERT INTO playlists (name) VALUES ($1) RETURNING *;",
    [name],
  );
  return rows[0];
}

export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT t.*
    FROM tracks t
    JOIN playlists_tracks pt ON t.id = pt.track_id
    WHERE pt.playlist_id = $1;
  `;
  const { rows } = await db.query(sql, [id]);
  return rows;
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [playlistId, trackId]);
  return rows[0];
}
