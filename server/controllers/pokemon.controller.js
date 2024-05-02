import httpStatus from "http-status";
import pokeApi from "../utils/pokedexPromise.js";
import { getAllPokemonsSchema, searchPokemonSchema } from "../validations/pokemonValidations.js";

const pokemonController = {
  async getAllPokemons(req, res, next) {
    try {
      const values = await getAllPokemonsSchema.validateAsync(req.query);

      const pokemons = await pokeApi.getResource([
        `/api/v2/pokemon/?limit=${values.limit}&offset=${values.offset}`,
      ]);

      const pokemonNames = [];

      for (let i = 0; i < pokemons[0].results.length; i++) {
        pokemonNames.push(pokemons[0].results[i].name);
      }

      const allPokemonDetails = await pokeApi.getPokemonByName(pokemonNames);

      const finalPokemonDetails = [];

      finalPokemonDetails.push({ count: pokemons[0].count });

      finalPokemonDetails[0].results = [];

      for (let i = 0; i < allPokemonDetails.length; i++) {
        finalPokemonDetails[0].results.push({
          id: allPokemonDetails[i].id,
          name: allPokemonDetails[i].name,
          sprites: allPokemonDetails[i].sprites.other["official-artwork"],
          height: allPokemonDetails[i].height,
          weight: allPokemonDetails[i].weight,
          stats: allPokemonDetails[i].stats,
          species: allPokemonDetails[i].species,
          types: allPokemonDetails[i].types,
          abilities: allPokemonDetails[i].abilities,
        });
      }

      res.status(httpStatus.OK).send(finalPokemonDetails);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async searchPokemon(req, res, next) {
    try {
      const values = await searchPokemonSchema.validateAsync(req.query);

      const pokemon = await pokeApi.getPokemonByName(values.name);

      const pokemonDetails = [
        {
          results: [],
        },
      ];

      pokemonDetails[0].results.push({
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites.other["official-artwork"],
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats,
        species: pokemon.species,
        types: pokemon.types,
        abilities: pokemon.abilities,
      });

      res.status(httpStatus.OK).send(pokemonDetails);
    } catch (err) {
      next(err);
    }
  },
};

export { pokemonController };
