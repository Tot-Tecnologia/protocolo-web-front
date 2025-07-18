import { UserType } from "@/domain/models";
import { useLocalStorage } from "@/presentation/hooks/useLocalStorage";

export function useLastUserType() {
  return useLocalStorage<UserType>("lastUserType", UserType.CIDADAO);
}
