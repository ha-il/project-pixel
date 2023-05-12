import express from "express";
import logger from "morgan";
import apiRouter from "./routers/apiRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("assets"));

app.get("/", (req, res) => {
  return res.render("layout.pug");
});

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  return res.render("layout.pug");
});

export default app;
