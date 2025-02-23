import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "../views/SignIn";

export const Route = createFileRoute("/")({
  component: SignIn,
});
