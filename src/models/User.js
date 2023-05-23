import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profileName: { type: String, required: true },
  password: { type: String, required: true },
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Playlist",
      default: [],
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
