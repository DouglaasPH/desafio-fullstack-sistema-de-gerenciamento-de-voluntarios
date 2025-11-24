// types
import type { Volunteer } from "@/types/volunteers";

export const filterVolunteers = (
  volunteers: Volunteer[],
  search: string,
  status: string,
  position: string,
  availability: string
) => {
  return volunteers.filter((v) => {
    const matchesSearch =
      v.nome.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "Todos os status" || v.status === status;
    const matchesPosition =
      position === "Todos os cargos" || v.cargo_pretendido === position;
    const matchesAvailability =
      availability === "Todas as disponibilidades" ||
      v.disponibilidade.toLowerCase() === availability.toLowerCase();

    return (
      matchesSearch && matchesStatus && matchesPosition && matchesAvailability
    );
  });
};
