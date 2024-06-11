import Pokedex from "pokedex-promise-v2";
const options = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cacheLimit: 172800, // 2days
  timeout: 5 * 1000, // 5s
};
const pokeApi = new Pokedex(options);

export default pokeApi;
