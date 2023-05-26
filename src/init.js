import "dotenv/config.js";
import "./db.js";
import "./models/User.js";
import "./models/Music.js";
import "./models/Playlist.js";
import app from "./server.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`✅ Server listening on port http://localhost:${port}`);
});
