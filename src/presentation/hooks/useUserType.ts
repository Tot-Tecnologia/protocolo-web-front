import { useLocalStorage } from "./useLocalStorage";

export function useUserType() {
  return useLocalStorage("userType", "");
}
