import db from "../client.js";

export async function getAllPlaylists() {
  const result = await db.query("SELECT * FROM playlists;");
  return result.rows;
}

export async function getPlaylistById(id) {
  const result = await db.query("SELECT * FROM playlists WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function getTracksByPlaylistId(id) {
  const result = await db.query(
    `SELECT t.* FROM tracks t
     JOIN playlists_tracks pt ON t.id = pt.track_id
     WHERE pt.playlist_id = $1;`,
    [id],
  );
  return result.rows;
}

export async function createPlaylist({ name }) {
  const result = await db.query(
    "INSERT INTO playlists (name) VALUES ($1) RETURNING *;",
    [name],
  );
  return result.rows[0];
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const result = await db.query(
    `INSERT INTO playlists_tracks (playlist_id, track_id)
     VALUES ($1, $2)
     RETURNING *;`,
    [playlistId, trackId],
  );
  return result.rows[0];
}
import db from "#db/client";

export async function createPlaylist(name, description, userId) {
  const sql = `
  INSERT INTO playlists
    (name, description, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, userId]);
  return playlist;
}

export async function getPlaylistsByUserId(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE user_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistsByTrackId(id) {
  const sql = `
  SELECT playlists.*
  FROM
    playlists
    JOIN playlists_tracks ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists_tracks.track_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}