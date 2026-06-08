import db from "./db/client.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query("DELETE FROM playlists_tracks;");
  await db.query("DELETE FROM playlists;");
  await db.query("DELETE FROM tracks;");

  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    tracks.push(`('Track ${i}', 'Artist ${i}')`);
  }
  await db.query(
    `INSERT INTO tracks (title, artist) VALUES ${tracks.join(", ")};`,
  );

  const playlists = [];
  for (let i = 1; i <= 10; i++) {
    playlists.push(`('Playlist ${i}')`);
  }
  await db.query(
    `INSERT INTO playlists (name) VALUES ${playlists.join(", ")};`,
  );

  const pairs = [];
  for (let i = 1; i <= 15; i++) {
    const playlistId = Math.ceil(Math.random() * 10);
    const trackId = Math.ceil(Math.random() * 20);
    pairs.push(`(${playlistId}, ${trackId})`);
  }
  await db.query(
    `INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ${pairs.join(", ")};`,
  );
}
