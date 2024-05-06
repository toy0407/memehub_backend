import { Schema, ValidationResult } from "joi";

class Validator {
  static validate<T>(input: T, schema: Schema): ValidationResult<T> {
    return schema.validate(input, { abortEarly: false });
  }
}
