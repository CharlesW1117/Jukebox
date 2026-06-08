import express from "express";
import { getTracks, getTrackById } from "../db/queries/tracks.js";

const router = express.Router();
export default router;

// GET /tracks — all tracks
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.status(200).send(tracks);
});

// GET /tracks/:id — single track by id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).send("Track id must be a number.");

  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track not found.");
  res.status(200).send(track);
});
