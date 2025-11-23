export interface Volunteer {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: string;
  disponibilidade: string;
  status: string;
  created_at: string;
}

export interface CreateVolunteerData {
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: string;
  disponibilidade: string;
}

export interface FiltersVolunteer {
  status?: string;
  cargo_pretendido?: string;
  disponibilidade?: string;
}

export interface UpdateVolunteer {
  nome?: string;
  email?: string;
  cargo_pretendido?: string;
  disponibilidade?: string;
}

export type VolunteerStatus = "ativo" | "inativo" | "Todos os status";

export type VolunteerAvailability =
  | "manha"
  | "tarde"
  | "noite"
  | "Todas as disponibilidades";

export type ApiErrorResponse = {
  message: string;
  error?: string;
  statusCode?: number;
  detail?: string;
};

export interface Filters {
  search: string;
  position: string;
  status: string;
  availability: string;
}
