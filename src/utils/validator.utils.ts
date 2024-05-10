import Joi, { options } from "joi";

interface ValidationResult<T> {
  value?: T;
  error?: Joi.ValidationError;
}

const validate = <T>(
  input: any,
  schema: Joi.ObjectSchema
): ValidationResult<T> => {
  return schema.validate(input, { stripUnknown: true });
};

export const Validator = {
  validate,
};
