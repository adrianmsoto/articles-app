// src/app/providers.tsx
import type { ReactNode } from "react"; // 👈 usa "import type"
import { Provider } from "react-redux";
import { store } from "../core/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../core/api/queryClient";
import { BrowserRouter } from "react-router-dom";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};
