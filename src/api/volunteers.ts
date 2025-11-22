// global type
import type {
  CreateVolunteerData,
  FiltersVolunteer,
  UpdateVolunteer,
  Volunteer,
} from "@/types/volunteers";
import api from "./api";

export const createVolunteer = async (
  data: CreateVolunteerData
): Promise<Volunteer> => {
  const response = await api.post("/volunteer", data);
  return response.data;
};

export const listVolunteer = async (
  data: FiltersVolunteer
): Promise<Volunteer[]> => {
  const response = await api.get("/volunteer", { params: data });
  return response.data;
};

export const getVolunteer = async (
  volunteer_id: number
): Promise<Volunteer> => {
  const response = await api.get(`/volunteer/${volunteer_id}`);
  return response.data;
};

export const updateVolunteer = async (
  volunteer_id: number,
  data: UpdateVolunteer
): Promise<Volunteer> => {
  const response = await api.put(`/volunteer/${volunteer_id}`, data);
  return response.data;
};

export const deleteVolunteer = async (
  volunteer_id: number
): Promise<Volunteer> => {
  const response = await api.delete(`/volunteer/${volunteer_id}`);
  return response.data;
};
