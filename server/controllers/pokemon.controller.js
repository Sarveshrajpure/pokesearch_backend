import httpStatus from "http-status";
import pokeApi from "../utils/pokedexPromise.js";

const pokemonController = {
  async getAllPokemons(req, res, next) {
    try {
      const pokemons = await pokeApi.getResource(["/api/v2/pokemon/?limit=5&offset=0"]);

      const pokemonNames = pokemons[0].results.map((item) => {
        return item.name;
      });

      const allPokemonDetails = await pokeApi.getPokemonByName(pokemonNames);
      const finalPokemonDetails = [];
      finalPokemonDetails.push({ count: pokemons[0].count });
      finalPokemonDetails[0].results = allPokemonDetails.map((item) => {
        return {
          name: item.name,
          sprites: item.sprites.other["official-artwork"],
          height: item.height,
          weight: item.weight,
          stats: item.stats,
          species: item.species,
          type: item.type,
          abilities: item.abilities,
        };
      });

      res.status(httpStatus.OK).send(finalPokemonDetails);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};

export { pokemonController };
