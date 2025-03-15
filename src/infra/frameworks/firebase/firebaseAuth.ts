import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/infra/frameworks/firebase";

export const firebaseAuth = getAuth(firebaseApp);
