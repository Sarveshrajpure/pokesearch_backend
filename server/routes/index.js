import express from "express";
const router = express.Router();
import { pokemonRoute } from "./pokemon.route.js";

router.use("/pokemon", pokemonRoute);

export { router as routes };
