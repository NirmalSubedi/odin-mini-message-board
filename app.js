import express from "express";
import indexRouter from "./routes/indexRouter.js";
import path from "node:path";
import { errorHandler, requestLogger } from "./controllers/globalController.js";

const app = express();
const PORT = 3000;

// Settings
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.set(express.static(assetsPath));

// Global MiddleWare
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

// Error Handling Middleware
app.use(errorHandler);

// Server
app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server listening on PORT: ${PORT}`);
});
