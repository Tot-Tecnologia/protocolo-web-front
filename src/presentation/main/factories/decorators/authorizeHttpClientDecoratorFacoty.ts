import { AuthorizeHttpClientDecorator } from "@/presentation/main/decorators/authorizeHttpClient";
import { makeLocalStorageAdapter } from "@/presentation/main/factories/cache/localStorageAdapterFactory";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeAuthorizeHttpClientDecorator() {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
}
