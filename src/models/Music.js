import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  youtubeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  imageUrl: { type: String },
  duration: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;