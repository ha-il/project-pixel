import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 30 },
  description: { type: String, maxLength: 50 },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Track",
      default: [],
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
