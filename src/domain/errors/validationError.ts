type ErrorMessage = {
  field: string;
  message: string;
};

type ValidationErrorArgs = {
  messages?: ErrorMessage[];
};

export class ValidationError extends Error {
  public messages: ErrorMessage[] | undefined;

  constructor({ messages }: ValidationErrorArgs = {}) {
    if (messages?.length) {
      super(messages.map((message) => message.message).join(". "));
      this.messages = messages;
    } else {
      const unexpectedMessage = "Erro de validação desconhecido.";
      super(unexpectedMessage);
    }
    this.name = "ValidationError";
  }
}
