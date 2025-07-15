import type {
  ChangeProtocolStatus,
  ChangeProtocolStatusArgs,
  ChangeProtocolStatusResponse,
} from "@/domain/usecases/changeProtocolStatus";

import { HttpClient, HttpStatusCode } from "../../protocols/http/httpClient";
import { UnexpectedError, ValidationError } from "@/domain/errors";
import { ProtocoloWebErrorResponse } from "@/domain/models";

export class RemoteChangeProtocolStatus implements ChangeProtocolStatus {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async change(
    args: ChangeProtocolStatusArgs,
    token: string,
  ): Promise<ChangeProtocolStatusResponse> {
    const response = await this.httpClient.request<
      ChangeProtocolStatusResponse | ProtocoloWebErrorResponse
    >({
      method: "patch",
      body: {
        status: args.status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${this.url}${args.id}`,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok: {
        return response.body as ChangeProtocolStatusResponse;
      }
      case HttpStatusCode.notFound: {
        const errorResponse = response.body as ProtocoloWebErrorResponse;
        const errors = errorResponse?.errors;
        if (errors != null) {
          throw new ValidationError({ messages: errors });
        }
        throw new UnexpectedError();
      }
      default:
        throw new UnexpectedError();
    }
  }
}
