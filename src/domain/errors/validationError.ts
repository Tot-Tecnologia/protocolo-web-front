type ValidationErrorArgs = {
  message?: string;
};

export class ValidationError extends Error {
  constructor({ message = "" }: ValidationErrorArgs = {}) {
    if (message.length) {
      super(message);
    } else {
      const unexpectedMessage = "Erro de validação desconhecido.";
      super(unexpectedMessage);
    }
    this.name = "ValidationError";
  }
}
