import { createNewUser, signin } from "./handlers/user";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200);
  res.json({ message: "Hello, world!" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
