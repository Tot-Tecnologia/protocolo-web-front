import { GetStorage } from "@/data/protocols/cache";
import { AuthorizeHttpClientDecorator } from "@/presentation/main/decorators/authorizeHttpClient/authorizeHttpClientDecorator";
import {
  HttpClientSpy,
  mockHttpRequest,
} from "@/tests/data/mocks/mockHttpClient";
import { faker } from "@faker-js/faker";

class GetStorageSpy implements GetStorage {
  value: any = null;
  key?: string;

  get<T>(key: string): T | null {
    this.key = key;
    return this.value as T | null;
  }
}

const makeSut = () => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return { sut, getStorageSpy, httpClientSpy };
};

describe("AuthorizeHttpClientDecorator", () => {
  test("should call GetStorage with correct values", async () => {
    const { sut, getStorageSpy } = makeSut();
    const request = mockHttpRequest();
    delete request.headers;

    await sut.request(request);

    expect(getStorageSpy.key).toBe("accessToken");
  });

  test("should call HttpClient with correct Authorization header", async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    const accessToken = faker.string.uuid();
    getStorageSpy.value = accessToken;

    await sut.request(mockHttpRequest());

    expect(httpClientSpy.headers?.Authorization).toBe(`Bearer ${accessToken}`);
  });

  test("should call HttpClient whithout Authorization header when the token from GetStorage is empty", async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    getStorageSpy.value = null;

    await sut.request(mockHttpRequest());

    expect(httpClientSpy.headers?.Authorization).toBeUndefined();
  });

  test("should merge HttpClient header", async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    const accessToken = faker.string.uuid();
    const request = mockHttpRequest();
    getStorageSpy.value = accessToken;

    await sut.request(request);

    const expectedHeader = {
      Authorization: `Bearer ${accessToken}`,
      ...httpClientSpy.headers,
    };

    expect(httpClientSpy.headers).toStrictEqual(expectedHeader);
  });

  test("shoul return the same response as HttpClient without decorator", async () => {
    const { sut, httpClientSpy } = makeSut();

    const response = await sut.request(mockHttpRequest());

    expect(httpClientSpy.response).toStrictEqual(response);
  });
});
