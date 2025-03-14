import { routeTree } from "@/presentation/router/generated/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

export const router = createRouter({ routeTree });
