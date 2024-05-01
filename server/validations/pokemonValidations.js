import Joi from "joi";

export const getAllPokemonsSchema = Joi.object({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
});

export const searchPokemonSchema = Joi.object({
  name: Joi.string().max(100).required(),
});
