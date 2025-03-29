import { useLocalStorage } from "@/presentation/hooks/useLocalStorage";

export function useAccessToken() {
  return useLocalStorage("accessToken", "");
}
