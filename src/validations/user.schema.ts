import Joi from "joi";

const userSchema = Joi.object({
  _id: Joi.string().optional().allow(null),
  userName: Joi.string().required().allow(null),
  email: Joi.string().email().required().allow(null),
  fullName: Joi.string().optional().allow(null),
  age: Joi.number().integer().optional().allow(null),
  phoneNumber: Joi.string().optional().allow(null),
  profileImageUrl: Joi.string().optional().allow(null),
  // TODO: Add memeList, favoriteMemeList
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserValidations = {
  userSchema,
  userLoginValidationSchema,
};
