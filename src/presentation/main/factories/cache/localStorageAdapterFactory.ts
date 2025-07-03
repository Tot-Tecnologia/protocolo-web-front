import { LocalStorageAdapter } from "@/infra/cache/localStorageAdapter";

export function makeLocalStorageAdapter() {
  return new LocalStorageAdapter();
}
