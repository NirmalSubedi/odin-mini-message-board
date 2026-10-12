import express from "express";
import { NotFoundError } from "../errors/NotFoundError.js";
import { MESSAGE_MAX_LENGTH, USERNAME_MAX_LENGTH } from "../config.js";
import * as db from "../db/queries.js";

const indexRouter = express.Router();

indexRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages();

  res.render("index", { title: "Message Board", messages });
});

indexRouter.get("/new", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("form", {
    title: "Send a new message!",
    messages,
    USERNAME_MAX_LENGTH,
    MESSAGE_MAX_LENGTH,
  });
});

indexRouter.post("/new", async (req, res) => {
  const { messageUser, messageText } = req.body;
  await db.postAMessage(messageUser, messageText);

  res.redirect("/");
});

indexRouter.get("/message/:id", async (req, res) => {
  const [message] = await db.getMessageByID(req.params.id);

  res.render("message", { message, title: "Message Detail" });
});

indexRouter.use((req, res) => {
  throw new NotFoundError("Page not found");
});

export default indexRouter;
