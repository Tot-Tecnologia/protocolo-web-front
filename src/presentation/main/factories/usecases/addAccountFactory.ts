import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";
import { firebaseAuth } from "@/infra/frameworks/firebase";

export function makeAddAccount() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/auth/registrar";
  return new RemoteAddAccount(fullUrl, makeAxiosHttpClient(), firebaseAuth);
}
