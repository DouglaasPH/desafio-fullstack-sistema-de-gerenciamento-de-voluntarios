// react
import type { ReactNode } from "react";

// tanstach
import { QueryClientProvider } from "@tanstack/react-query";

// test
import { createTestQueryClient } from "./queryClient";

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
