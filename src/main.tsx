import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import { SignIn } from "./views/SignIn";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
);
