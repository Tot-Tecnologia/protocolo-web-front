import { RemoteAddAccount } from "@/data/usecases/addAccount/remoteAddAccount";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";
import { firebaseAuth } from "@/infra/frameworks/firebase";

export function makeAddAccount() {
  return new RemoteAddAccount(
    getFullUrl("/portal-cidadao/auth/registrar"),
    makeAxiosHttpClient(),
    firebaseAuth,
  );
}

export function makeAddServidorAccount() {
  return new RemoteAddAccount(
    getFullUrl("/portal-cidadao/auth/registrar/servidor"),
    makeAxiosHttpClient(),
    firebaseAuth,
  );
}

function getFullUrl(path: string) {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  return baseUrl + path;
}
