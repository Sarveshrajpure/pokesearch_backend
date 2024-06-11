import express from "express";
const app = express();
import cors from "cors";
import { routes } from "./routes/index.js";
import { convertToApiError, handleError } from "./middlewares/error-handling-middleware.js";
import "dotenv/config";
// CORS
const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin || "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

///body parser
app.use(express.json());

//ROUTES
app.use("/api", routes);

// Error Handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
