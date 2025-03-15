import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/infra/frameworks/firebase/firebaseApp";

export const firebaseAuth = getAuth(firebaseApp);
