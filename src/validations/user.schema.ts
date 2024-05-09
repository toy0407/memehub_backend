import Joi from "joi";

const userSchema = Joi.object({
  _id: Joi.string().optional().allow(null),
  userName: Joi.string().optional().allow(null),
  email: Joi.string().email().optional().allow(null),
  password: Joi.string().optional().allow(null),
  fullName: Joi.string().optional().allow(null),
  age: Joi.number().integer().optional().allow(null),
  phoneNumber: Joi.string().optional().allow(null),
  profileImageUrl: Joi.string().optional().allow(null),
  // TODO: Add memeList, favoriteMemeList
});

const userRegisterValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userName: Joi.string().required(),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const findUserByUsernameSchema = Joi.object({
  userName: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  // TODO: Test
  update: Joi.object({
    fullName: Joi.string().optional().allow(null),
    age: Joi.number().integer().optional().allow(null),
    phoneNumber: Joi.string().optional().allow(null),
    profileImageUrl: Joi.string().optional().allow(null),
    createdAt: Joi.date().iso().optional().allow(null),
    updatedAt: Joi.date().iso().optional().allow(null),
  }).min(1),
});

export const UserValidations = {
  userSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  findUserByUsernameSchema,
  updateUserSchema,
};
