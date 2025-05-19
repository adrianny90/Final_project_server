import Joi from "joi";

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(4).max(18).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(12).required(),
});

export const itemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().required(),
  category: Joi.string(),
});
