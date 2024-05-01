import express from "express";
import { pokemonController } from "../controllers/pokemon.controller.js";
const router = express.Router();

router.get("/getallpokemons", pokemonController.getAllPokemons);

router.get("/searchpokemon", pokemonController.searchPokemon);

export { router as pokemonRoute };
