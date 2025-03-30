import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeAddAccount() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/autenticacao/criar-conta";
  return new RemoteAddAccount(fullUrl, makeAxiosHttpClient());
}
