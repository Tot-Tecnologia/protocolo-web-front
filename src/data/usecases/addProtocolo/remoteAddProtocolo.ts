import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebDefaultResponse } from "@/domain/models";
import { AddProtocolo, AddProtocoloArgs } from "@/domain/usecases";

export class RemoteAddProtocolo implements AddProtocolo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async save(args: AddProtocoloArgs | FormData, token: string): Promise<void> {
    const isFormData = args instanceof FormData;

    const httpResponse =
      await this.httpClient.request<ProtocoloWebDefaultResponse | void>({
        url: this.url,
        method: "post",
        body: args,
        headers: {
          Authorization: `Bearer ${token}`,
          // ✅ Não defina Content-Type se for FormData
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
      });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        return httpResponse.body as void;
      }

      case HttpStatusCode.badRequest: {
        const errorResponse = httpResponse.body as ProtocoloWebDefaultResponse;
        const message = errorResponse?.mensagem;
        if (message != null) {
          throw new ValidationError({ message: message });
        }
        throw new UnexpectedError();
      }

      default: {
        throw new UnexpectedError();
      }
    }
  }
}
