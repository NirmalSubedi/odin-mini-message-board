import express from "express";
import { getIndexPage } from "../controllers/indexController.js";

const indexRouter = express.Router();

const messages = [
  { text: "Hi there!", user: "Amando", time: new Date() },
  { text: "Hello World!", user: "Charles", time: new Date() },
];

indexRouter.get(
  "/",
  getIndexPage({ title: "Home | Mini MessageBoard", messages }),
);

indexRouter.use("/new", () => {});

export default indexRouter;
