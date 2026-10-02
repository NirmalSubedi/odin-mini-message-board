export const requestLogger = (req, res, next) => {
  const requestStartTime = performance.now();

  res.once("finish", () => {
    const responseDuration =
      (performance.now() - requestStartTime).toFixed(4) + "ms";
    const timeOfRequest = new Date().toUTCString();

    console.log(
      `${timeOfRequest} - ${req.method} ${req.originalUrl} ${res.statusCode} - ${responseDuration}`,
    );
  });

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
};
