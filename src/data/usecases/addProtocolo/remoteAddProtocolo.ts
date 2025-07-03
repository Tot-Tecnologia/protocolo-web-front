import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebErrorResponse } from "@/domain/models";
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

  async save(args: AddProtocoloArgs): Promise<AddProtocoloResponse> {
    const httpResponse = await this.httpClient.request<
      ProtocoloWebErrorResponse | AddProtocoloResponse
    >({
      url: this.url,
      method: "post",
      body: args,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        return httpResponse.body as AddProtocoloResponse;
      }

      case HttpStatusCode.badRequest: {
        const errorResponse = httpResponse.body as ProtocoloWebErrorResponse;
        const errors = errorResponse?.errors;
        if (errors != null) {
          throw new ValidationError({ messages: errors });
        }
        throw new UnexpectedError();
      }

      default: {
        throw new UnexpectedError();
      }
    }
  }
}
