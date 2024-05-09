import Joi from "joi";

interface ValidationResult<T> {
  value?: T;
  error?: Joi.ValidationError;
}

const validate = <T>(
  input: any,
  schema: Joi.ObjectSchema
): Promise<ValidationResult<T>> => {
  return new Promise((resolve, reject) => {
    const result = schema.validate(input, {
      stripUnknown: true,
    });
    if (result.error) {
      const error: Joi.ValidationError = result.error;
      resolve({ error });
    } else {
      resolve({ value: result.value });
    }
  });
};

export const Validator = {
  validate,
};
