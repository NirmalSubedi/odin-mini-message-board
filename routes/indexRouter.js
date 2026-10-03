import express from "express";
import { NotFoundError } from "../errors/NotFoundError.js";

const indexRouter = express.Router();
const messages = [
  { text: "Hi there!", user: "Amando", time: new Date() },
  { text: "Hello World!", user: "Charles", time: new Date() },
  {
    text: "Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!",
    user: "Bobby",
    time: new Date(),
  },
];

indexRouter.get("/", (req, res) =>
  res.render("index", { title: "Message Board", messages }),
);

indexRouter.get("/new", (req, res) =>
  res.render("form", { title: "Send a new message!", messages }),
);

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ user: messageUser, text: messageText, time: new Date() });
  res.redirect("/");
});

indexRouter.get("/message/:index", (req, res) => {
  const { index } = req.params;
  const message = messages[index];
  if (!message) throw new NotFoundError("Message not found");
  res.render("message", { message, title: "Message Detail" });
});

indexRouter.use((req, res) => {
  throw new NotFoundError("Page not found");
});

export default indexRouter;
