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

export const getAllPositions = (volunteers: Volunteer[]) => {
  return Array.from(new Set(volunteers.map((v) => v.cargo_pretendido)));
};

export const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};
