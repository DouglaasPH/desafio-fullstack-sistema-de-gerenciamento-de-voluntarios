import { render, screen, waitFor } from "@testing-library/react";
import NewVolunteer from "./NewVolunteer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock da mutação
const mutateMock = vi.fn();
vi.mock("@/hooks/useCreateVolunteer", () => ({
  useCreateVolunteer: () => ({
    mutate: mutateMock,
    status: "idle",
    error: null,
  }),
}));

// Mock do navigate
const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("Nova página de voluntário", () => {
  beforeEach(() => {
    render(<NewVolunteer />);
    mutateMock.mockClear(); // limpa chamadas anteriores
  });

  it("renderiza inputs e botões", () => {
    expect(screen.getByPlaceholderText(/Nome completo/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/email@example.com/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/\(\d{2}\) \d{5}-\d{4}/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar Voluntário/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancelar/i })
    ).toBeInTheDocument();
  });

  it("chama mutate com dados corretos", async () => {
    const user = userEvent.setup();

    // Preenche os inputs
    await user.type(screen.getByPlaceholderText(/Nome completo/i), "Alice");
    await user.type(
      screen.getByPlaceholderText(/email@example.com/i),
      "alice@email.com"
    );
    await user.type(
      screen.getByPlaceholderText(/\(\d{2}\) \d{5}-\d{4}/i),
      "(11) 98765-4321"
    );

    // Submete o formulário
    await user.click(
      screen.getByRole("button", { name: /Cadastrar Voluntário/i })
    );

    // Espera o mutate ser chamado
    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "Alice",
          email: "alice@email.com",
          telefone: "(11) 98765-4321",
          cargo_pretendido: "Full Stack Jr", // valor default
          disponibilidade: "Tarde", // valor default
        })
      );
    });
  });

  it("botão cancelar chama navigate", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(navigateMock).toHaveBeenCalled();
  });
});
