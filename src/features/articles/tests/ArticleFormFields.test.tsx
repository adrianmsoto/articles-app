import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import ArticleForm from "../ui/ArticleForm";

const queryClient = new QueryClient();

test("does not allow saving when required fields are empty", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ArticleForm />
      </MemoryRouter>
    </QueryClientProvider>
  );

  // Get the submit button
  const submitButton = screen.getByRole("button", { name: /create article/i });

  // Click without filling out fields
  fireEvent.click(submitButton);

  expect(await screen.findByText("Title is required")).toBeInTheDocument();
  expect(screen.getByText("Category is required")).toBeInTheDocument();
  expect(screen.getByText("Author is required")).toBeInTheDocument();
  expect(screen.getByText("Content is required")).toBeInTheDocument();

  // Make sure it didn’t trigger saving
  expect(submitButton).toHaveTextContent("Create Article");
});
