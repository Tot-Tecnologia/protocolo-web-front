type IValidationErrorArgs = {
  errors?: string[];
};

export class ValidationError extends Error {
  errors: string[];

  constructor({ errors = [] }: IValidationErrorArgs = {}) {
    super(errors.join("; "));
    this.errors = errors;
    this.name = "ValidationError";
  }
}
