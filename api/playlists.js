import express from "express";
import {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  getTracksByPlaylistId,
  addTrackToPlaylist,
} from "../db/queries/playlists.js";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.status(200).send(playlists);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("Playlist name required.");
  const playlist = await createPlaylist(name);
  res.status(201).send(playlist);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).send("Playlist id must be a number.");

  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  res.status(200).send(playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).send("Playlist id must be a number.");

  const tracks = await getTracksByPlaylistId(id);
  res.status(200).send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  const playlistId = Number(req.params.id);
  const { trackId } = req.body;

  if (!trackId) return res.status(400).send("trackId required.");
  if (isNaN(playlistId) || isNaN(trackId))
    return res.status(400).send("IDs must be numbers.");

  const playlistTrack = await addTrackToPlaylist(playlistId, trackId);
  res.status(201).send(playlistTrack);
});
