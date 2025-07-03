import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";
import { faker } from "@faker-js/faker";

let mockLocalStorage: Record<string, string> = {};

const makeSut = () => new LocalStorageAdapter();

beforeAll(() => {
  vi.spyOn(global.Storage.prototype, "setItem").mockImplementation(
    (key, value) => {
      mockLocalStorage[key] = value;
    },
  );

  vi.spyOn(global.Storage.prototype, "getItem").mockImplementation(
    (key) => mockLocalStorage[key],
  );

  vi.spyOn(global.Storage.prototype, "removeItem").mockImplementation((key) => {
    delete mockLocalStorage[key];
  });
});

beforeEach(() => {
  mockLocalStorage = {};
});

describe("LocalStorageAdapter", () => {
  test("should call localStorage.setItem with correct values", () => {
    const sut = makeSut();
    const key = faker.lorem.word();
    const value = faker.lorem.sentence();

    sut.set(key, { value });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
      `@ProtocoloWeb__Key=${key}`,
      JSON.stringify({ value }),
    );
  });

  test("should call localStorage.getItem with correct values", () => {
    const sut = makeSut();
    const key = faker.lorem.word();

    sut.get(key);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.Storage.prototype.getItem).toHaveBeenCalledWith(
      `@ProtocoloWeb__Key=${key}`,
    );
  });

  test("should call localStorage.removeItem when value is nullish", () => {
    const sut = makeSut();
    const key = faker.lorem.word();

    sut.set(key, undefined as never);
    sut.set(key, null as never);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.Storage.prototype.removeItem).toHaveBeenCalledWith(
      `@ProtocoloWeb__Key=${key}`,
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.Storage.prototype.removeItem).toHaveBeenCalledTimes(2);
  });

  test("should return the correct value on get", () => {
    const sut = makeSut();
    const key = faker.lorem.word();
    const value = faker.lorem.sentence();

    sut.set(key, { value });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const returnedValueOnGet = sut.get(key);

    expect(returnedValueOnGet).toStrictEqual({ value });
  });

  test("should return null when a key is not in use", () => {
    const sut = makeSut();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = sut.get(faker.lorem.word());

    expect(value).toBeNull();
  });
});
