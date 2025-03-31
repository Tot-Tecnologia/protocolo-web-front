type IValidationErrorArgs = {
  errors?: string[];
};

export class ValidationError extends Error {
  errors: string[];

  constructor({ errors = [] }: IValidationErrorArgs = {}) {
    if (errors.length) {
      super(errors.join("; "));
      this.errors = errors;
    } else {
      const unexpectedMessage = "Erro de validação desconhecido.";
      super(unexpectedMessage);
      this.errors = [unexpectedMessage];
    }
    this.name = "ValidationError";
  }
}
