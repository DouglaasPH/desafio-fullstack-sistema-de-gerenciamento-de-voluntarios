import { useState } from "react";
import { formatTelefone, validateEmail, validateTelefone } from "@/utils/utils";
import type { CreateVolunteerData } from "@/types/volunteers";
import { useCreateVolunteer } from "./useCreateVolunteer";

interface Alert {
  title: string;
  description: string;
}

export function useCreateVolunteerForm() {
  const [alert, setAlert] = useState<null | Alert>(null);
  const [form, setForm] = useState<CreateVolunteerData>({
    nome: "",
    email: "",
    cargo_pretendido: "Full Stack Jr",
    disponibilidade: "Tarde",
    telefone: "",
  });
  const [emailError, setEmailError] = useState<null | string>(null);
  const [telefoneError, setTelefoneError] = useState<null | string>(null);

  const { mutate, status, error } = useCreateVolunteer();

  // Handler genérico: reduz MUITO código
  const handleChange = (field: string, value: string) => {
    let newValue = value;

    // Reset do estado de validação enquanto digita
    if (field === "email") setEmailError(null);
    if (field === "telefone") {
      setTelefoneError(null);

      if (value.length > 15) return;
      if (value.length > 0) {
        newValue = formatTelefone(value);
      }
    }
    setForm((prev) => ({ ...prev, [field]: newValue }));
  };

  // Validação simples
  const handleBlur = (field: string) => {
    if (field === "email" && form.email.length > 0) {
      const v = validateEmail(form.email);

      if (!v) setEmailError("Email inválido");
    } else if (field === "email" && form.email.length === 0) {
      setEmailError(null);
    } else if (field === "telefone" && form.telefone.length > 0) {
      const v = validateTelefone(form.telefone);

      if (!v) setTelefoneError("Telefone inválido");
    }
  };

  // Checa se todos os campos foram inseridos valores
  const nothingChanged = () => {
    const condition =
      form.nome == "" ||
      form.cargo_pretendido == "" ||
      form.disponibilidade == "" ||
      form.telefone == "" ||
      emailError !== null ||
      telefoneError !== null;

    if (condition) {
      setAlert({
        title: "Não foi possível cadastrar voluntário.",
        description:
          "Para cadastrar voluntário é necessário alterar corretamente todos campos abaixo.",
      });
    }

    return condition;
  };

  // SUBMIT PRINCIPAL
  const handleSubmit = () => {
    console.log(form, emailError, telefoneError, alert);
    if (emailError || telefoneError) return;

    if (nothingChanged()) {
      return { error: "no_changes" };
    }

    mutate(form);
  };

  return {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting: status === "pending",
    status,
    errorCreate: error,
    alert,
    emailError,
    telefoneError,
  };
}
