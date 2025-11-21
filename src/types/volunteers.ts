export interface Volunteer {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: string;
  disponibilidade: string;
  status: string;
  create_at: string;
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
