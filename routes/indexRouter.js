import express from "express";
import { NotFoundError } from "../errors/NotFoundError.js";
import { MESSAGE_MAX_LENGTH, USERNAME_MAX_LENGTH } from "../config.js";
import * as db from "../db/queries.js";
import { body, matchedData, validationResult } from "express-validator";

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

const emptyError = "must not be empty or contain only whitespace.";
const usernameLengthError = `must be maximum of ${USERNAME_MAX_LENGTH} characters in length.`;
const messageLengthError = `must be maximum of ${MESSAGE_MAX_LENGTH} characters in length.`;

const validateMessage = [
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyError}`)
    .isLength({ max: USERNAME_MAX_LENGTH })
    .withMessage(`Username ${usernameLengthError}`),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage(`Message ${emptyError}`)
    .isLength({ max: MESSAGE_MAX_LENGTH })
    .withMessage(`Message ${messageLengthError}`),
];

indexRouter.post("/new", validateMessage, async (req, res) => {
  const errors = validationResult(req);
  const { messageUser, messageText } = matchedData(req);

  const thereAreErrors = !errors.isEmpty();
  if (thereAreErrors) {
    const messages = await db.getAllMessages();
    return res.status(400).render("form", {
      title: "Error: Send a new message!",
      messages,
      USERNAME_MAX_LENGTH,
      MESSAGE_MAX_LENGTH,
      errors: errors.mapped(),
      messageUser,
      messageText,
    });
  }

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
