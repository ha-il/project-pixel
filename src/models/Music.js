import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  youtubeId: { type: String, required: true, unique: true },
  title: { type: String, required: true, minLength: 1, maxLength: 30 },
  artist: { type: String, required: true, minLength: 1, maxLength: 30 },
  imageUrl: { type: String },
  duration: { type: String, required: true },
  playcount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
