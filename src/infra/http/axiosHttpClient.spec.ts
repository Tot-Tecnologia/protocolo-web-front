import { HttpMethod } from "@/data/protocols/http/httpClient";
import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";
import { faker } from "@faker-js/faker";

const url = faker.internet.url();

const makeSut = () => {
  const sut = new AxiosHttpClient();
  return { sut };
};

const { mockedRequest } = vi.hoisted(() => {
  const mockedRequest = vi.fn().mockResolvedValue({ data: {} });
  return { mockedRequest };
});

vi.mock("axios", () => ({
  default: {
    request: mockedRequest,
  },
}));

describe("AxiosHttpClient", () => {
  test("should call axios with correct parameters", async () => {
    const { sut } = makeSut();
    const method: HttpMethod = "post";

    await sut.request({ url, method });

    expect(mockedRequest).toHaveBeenCalledWith({ url, method });
  });
});
