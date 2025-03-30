import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";
import { mockHttpRequest } from "@/tests/data/mocks/mockHttpClient";

const makeSut = () => {
  const sut = new AxiosHttpClient();
  return { sut };
};

const { mockedRequest, mockedRequestValue } = vi.hoisted(() => {
  const mockedRequestValue = { status: 200, data: { key: "value" } };
  const mockedRequest = vi.fn().mockResolvedValue(mockedRequestValue);
  return { mockedRequest, mockedRequestValue };
});

vi.mock("axios", async () => {
  const originalAxios = await vi.importActual<typeof import("axios")>("axios");

  return {
    ...originalAxios,
    default: {
      ...originalAxios.default,
      request: mockedRequest,
    },
  };
});

describe("AxiosHttpClient", () => {
  test("should call axios with correct parameters", async () => {
    const { sut } = makeSut();
    const httpRequest = mockHttpRequest();

    await sut.request(httpRequest);

    expect(mockedRequest).toHaveBeenCalledWith({
      url: httpRequest.url,
      method: httpRequest.method,
      data: httpRequest.body,
    });
  });

  test("should return correct response", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedRequestValue.status,
      body: mockedRequestValue.data,
    });
  });

  test("should return correct error", async () => {
    const { sut } = makeSut();

    const mockedRejectedValue = {
      status: 500,
      data: null,
    };

    mockedRequest.mockRejectedValue({
      isAxiosError: true,
      response: mockedRejectedValue,
    });

    const errorResponse = await sut.request(mockHttpRequest());

    expect(errorResponse).toEqual({
      statusCode: mockedRejectedValue.status,
      body: mockedRejectedValue.data,
    });
  });
});
