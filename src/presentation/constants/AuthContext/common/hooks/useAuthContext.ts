import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export function useAuthContext() {
  return useContext(AuthContext);
}
