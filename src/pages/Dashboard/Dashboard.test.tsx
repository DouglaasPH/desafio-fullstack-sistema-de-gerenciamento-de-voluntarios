import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Dashboard from "./Dashboard";
import { TestProvider } from "@/tests/TestProvider";
import type { Volunteer } from "@/types/volunteers";

// Mock do hook useListVolunteers
vi.mock("@/hooks/useListVolunteers", () => ({
  useListVolunteers: () => ({
    data: [
      {
        id: 1,
        nome: "Alice",
        email: "alice@email.com",
        status: "Ativo",
        cargo_pretendido: "Dev",
        disponibilidade: "Manhã",
      },
      {
        id: 2,
        nome: "Bob",
        email: "bob@email.com",
        status: "Inativo",
        cargo_pretendido: "Designer",
        disponibilidade: "Tarde",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// Mock de soft delete
const mutateMock = vi.fn();
vi.mock("@/hooks/useSoftDeleteVolunteers", () => ({
  useSoftDeleteVolunteers: () => ({
    mutate: mutateMock,
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// Mock de hooks e funções de utilidade
vi.mock("@/hooks/useFilteredVolunteers", () => ({
  useFilteredVolunteers: (volunteers: Volunteer[]) => volunteers,
}));

vi.mock("@/utils/volunter", () => ({
  getAllPositions: () => ["Dev", "Designer"],
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

test("soft delete chama mutate com o ID correto", async () => {
  render(
    <TestProvider>
      <Dashboard />
    </TestProvider>
  );

  const buttonAlice = screen.getByTestId("soft-delete-1");
  fireEvent.click(buttonAlice);

  await waitFor(() => {
    expect(mutateMock).toHaveBeenCalledWith(1);
  });
});

test("renderiza o título do dashboard", () => {
  render(
    <TestProvider>
      <Dashboard />
    </TestProvider>
  );
  const title = screen.getByText(/Gerenciamento de Voluntários/i);
  expect(title).toBeInTheDocument();
});

test("renderiza botão de novo voluntário", () => {
  render(
    <TestProvider>
      <Dashboard />
    </TestProvider>
  );
  const button = screen.getByRole("button", { name: /Novo Voluntário/i });
  expect(button).toBeInTheDocument();
});

test("renderiza voluntários na tabela", () => {
  render(
    <TestProvider>
      <Dashboard />
    </TestProvider>
  );
  const volunteer1 = screen.getByText("Alice");
  const volunteer2 = screen.getByText("Bob");
  expect(volunteer1).toBeInTheDocument();
  expect(volunteer2).toBeInTheDocument();
});
