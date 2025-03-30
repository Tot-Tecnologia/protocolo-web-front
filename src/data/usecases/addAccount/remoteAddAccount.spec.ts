import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpClient";
import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { AddAccountArgs } from "@/domain/usecases";
import { CPF_LENGTH } from "@/presentation/constants/stringLength";
import { faker } from "@faker-js/faker";

class HttpClientSpy<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpClient<TRequestBody, TResponseBody>
{
  url?: string;
  method?: HttpMethod;
  body?: TRequestBody;
  response?: Promise<HttpResponse<TResponseBody>>;

  request(data: HttpRequest<TRequestBody>) {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;

    this.response = Promise.resolve({
      body: null as never,
      statusCode: HttpStatusCode.ok,
    });

    return Promise.resolve(this.response);
  }
}

describe("RemoteAddAccount", () => {
  test("should call HttpClient with correct values", async () => {
    const url = faker.internet.url();

    const httpClientSpy = new HttpClientSpy<AddAccountArgs, void>();

    const addAccountArgs: AddAccountArgs = {
      cpfCnpj: faker.string.numeric(CPF_LENGTH),
      email: faker.internet.email(),
      nome: faker.person.fullName(),
      senha: faker.string.alphanumeric(6),
      telefone: faker.string.numeric(10),
    };

    const sut = new RemoteAddAccount(url, httpClientSpy);

    await sut.signIn(addAccountArgs);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountArgs);
  });
});
