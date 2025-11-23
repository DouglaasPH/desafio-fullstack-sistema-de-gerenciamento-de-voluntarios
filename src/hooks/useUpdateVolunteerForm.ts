import { useEffect, useState } from "react";
import { useUpdateVolunteer } from "@/hooks/useUpdateVolunteer";
import { validateEmail } from "@/utils/utils";
import type { UpdateVolunteer, Volunteer } from "@/types/volunteers";

interface Alert {
  title: string;
  description: string;
}

export function useUpdateVolunteerForm(volunteer?: Volunteer) {
  const [alert, setAlert] = useState<null | Alert>(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo_pretendido: "",
    disponibilidade: "",
  });

  const [errors, setErrors] = useState({
    email: null as null | string,
  });

  const { mutate, status, error } = useUpdateVolunteer();

  // Sincroniza o formulário com os dados do voluntário
  useEffect(() => {
    if (!volunteer) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      nome: volunteer.nome,
      email: volunteer.email,
      cargo_pretendido: volunteer.cargo_pretendido,
      disponibilidade: volunteer.disponibilidade,
    });
  }, [volunteer]);

  // Handler genérico: reduz MUITO código
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Validação simples
  const handleBlur = (field: string) => {
    if (field === "email" && form.email.length > 0) {
      const ok = validateEmail(form.email);
      setErrors((prev) => ({ ...prev, email: ok ? null : "Email inválido" }));
    }
  };

  // Checa se o usuário alterou alguma coisa
  const nothingChanged = () => {
    if (!volunteer) return true;

    const condition =
      form.nome === volunteer.nome &&
      form.email === volunteer.email &&
      form.cargo_pretendido === volunteer.cargo_pretendido &&
      form.disponibilidade === volunteer.disponibilidade;

    if (condition) {
      setAlert({
        title: "Não foi possível atualizar voluntário.",
        description:
          "Para atualizar voluntário é necessário alterar corretamente ao menos um dos campos abaixo.",
      });
    }

    return condition;
  };

  // Monta objeto UpdateVolunteer apenas com campos modificados
  const buildPayload = () => {
    const payload: UpdateVolunteer = {};

    if (form.nome !== volunteer?.nome) payload.nome = form.nome;
    if (form.email !== volunteer?.email) payload.email = form.email;
    if (form.cargo_pretendido !== volunteer?.cargo_pretendido)
      payload.cargo_pretendido = form.cargo_pretendido;
    if (form.disponibilidade !== volunteer?.disponibilidade)
      payload.disponibilidade = form.disponibilidade;

    return payload;
  };

  // SUBMIT PRINCIPAL
  const handleSubmit = () => {
    if (errors.email) return;

    if (nothingChanged()) {
      return { error: "no_changes" };
    }

    const payload = buildPayload();

    mutate({ volunteer_id: volunteer!.id, data: payload });
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting: status === "pending",
    status,
    errorUpdate: error,
    alert,
  };
}
