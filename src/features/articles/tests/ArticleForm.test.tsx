import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import ArticleForm from "../features/articles/ui/ArticleForm";

const queryClient = new QueryClient();

test("permite escribir en el campo de título", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ArticleForm />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const titleInput = screen.getByPlaceholderText("Title");
  fireEvent.change(titleInput, { target: { value: "Nuevo artículo" } });
  expect(titleInput).toHaveValue("Nuevo artículo");
});
