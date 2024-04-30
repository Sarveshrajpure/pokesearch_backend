import express from "express";
import { pokemonController } from "../controllers/pokemon.controller.js";
const router = express.Router();

router.get("/getallpokemons", pokemonController.getAllPokemons);

export { router as pokemonRoute };
