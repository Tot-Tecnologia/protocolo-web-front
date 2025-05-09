import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebDefaultResponse } from "@/domain/models";
import {
  AddProtocolo,
  AddProtocoloArgs,
  AddProtocoloResponse,
} from "@/domain/usecases";

export class RemoteAddProtocolo implements AddProtocolo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async save(
    args: AddProtocoloArgs,
    token: string,
  ): Promise<AddProtocoloResponse> {
    const httpResponse = await this.httpClient.request<
      ProtocoloWebDefaultResponse | AddProtocoloResponse
    >({
      url: this.url,
      method: "post",
      body: args,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        return httpResponse.body as AddProtocoloResponse;
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
