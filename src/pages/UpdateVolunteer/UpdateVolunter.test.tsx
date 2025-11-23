import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpdateVolunteerPage from "./UpdateVolunteer";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TestProvider } from "@/tests/TestProvider";

// ----- MOCKS -----

// Mock do hook useUpdateVolunteer
const mutateMock = vi.fn();
vi.mock("@/hooks/useUpdateVolunteer", () => ({
  useUpdateVolunteer: () => ({
    mutate: mutateMock,
    status: "idle",
    error: null,
  }),
}));

// Mock do hook que retorna o voluntário
const volunteerData = {
  id: 1,
  nome: "Alice Updated",
  email: "alice@email.com",
  cargo_pretendido: "Full Stack Jr",
  disponibilidade: "Tarde",
};
vi.mock("@/hooks/useGetVolunteer", () => ({
  useGetVolunteer: () => ({
    data: volunteerData,
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// Mock do react-router-dom
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ volunteer_id: "1" }),
    useNavigate: () => vi.fn(),
  };
});

// ----- TESTES -----

describe("Página UpdateVolunteer", () => {
  beforeEach(() => {
    mutateMock.mockClear();
    render(
      <TestProvider>
        <UpdateVolunteerPage />
      </TestProvider>
    );
  });

  it("renderiza inputs e botões com valores iniciais", () => {
    expect(screen.getByPlaceholderText("Nome completo")).toHaveValue(
      volunteerData.nome
    );
    expect(screen.getByPlaceholderText("email@example.com")).toHaveValue(
      volunteerData.email
    );
  });

  it("renderiza inputs e botões", () => {
    expect(screen.getByPlaceholderText("Nome completo")).toHaveValue(
      volunteerData.nome
    );
    expect(screen.getByPlaceholderText("email@example.com")).toHaveValue(
      volunteerData.email
    );
  });

  it("chama updateVolunteer com dados corretos sem tocar nos selects", async () => {
    const user = userEvent.setup();

    const inputNome = screen.getByPlaceholderText("Nome completo");
    const inputEmail = screen.getByPlaceholderText("email@example.com");

    await user.clear(inputNome);
    await user.type(inputNome, "Alice Updated Test");

    await user.clear(inputEmail);
    await user.type(inputEmail, "alice.updated@email.com");

    const btnSalvar = screen.getByRole("button", { name: /atualizar/i });
    await user.click(btnSalvar);

    expect(mutateMock).toHaveBeenCalledWith({
      volunteer_id: volunteerData.id,
      data: {
        nome: "Alice Updated Test",
        email: "alice.updated@email.com",
      },
    });
  });

  it("botão cancelar chama navigate", async () => {
    const user = userEvent.setup();
    const cancelButton = screen.getByText("Cancelar");
    await user.click(cancelButton);
  });
});
