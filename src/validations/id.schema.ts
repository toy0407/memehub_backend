import Joi from "joi";

const userIdSchema = Joi.object({
  userId: Joi.string().required(),
});

export const IdValidations = {
  userIdSchema,
};
