import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebErrorResponse } from "@/domain/models";
import {
  AddDocumentosToProtocolo,
  AddDocumentosToProtocoloArgs,
  AddDocumentosToProtocoloResponse,
} from "@/domain/usecases";

export class RemoteAddDocumentosToProtocolo
  implements AddDocumentosToProtocolo
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async add(
    args: AddDocumentosToProtocoloArgs,
  ): Promise<AddDocumentosToProtocoloResponse> {
    const { idProtocolo, ...body } = args;
    const httpResponse = await this.httpClient.request<
      ProtocoloWebErrorResponse | AddDocumentosToProtocoloResponse
    >({
      url: `${this.url}/${idProtocolo}`,
      method: "patch",
      body: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return httpResponse.body as AddDocumentosToProtocoloResponse;
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
