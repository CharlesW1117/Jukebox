import express from "express";
import morgan from "morgan";

import tracksRouter from "./api/tracks.js";
import playlistsRouter from "./api/playlists.js";

const app = express();
export default app;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routers
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("Not found");
});
