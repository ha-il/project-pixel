import "dotenv/config.js";
import "./db.js";
import "./models/User.js";
import "./models/Music.js";
import app from "./server.js";
import https from "https";
import fs from "fs";

const port = 3000;

const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`✅ Server listening on port https://localhost:${port}`);
});
