import express from "express";
import indexRouter from "./routes/indexRouter.js";
import path from "node:path";
import { errorHandler, requestLogger } from "./controllers/globalController.js";

const app = express();
const PORT = 3000;

// Settings
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// Global MiddleWare
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

// Routes
app.use("/", indexRouter);

// Error Handling Middleware
app.use(errorHandler);

// Server
app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server listening on PORT: ${PORT}`);
});
