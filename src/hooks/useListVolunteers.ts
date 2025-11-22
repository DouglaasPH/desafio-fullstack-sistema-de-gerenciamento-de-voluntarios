// tanstack react-query
import { useQuery } from "@tanstack/react-query";

// axios
import { AxiosError } from "axios";

// types
import type {
  ApiErrorResponse,
  FiltersVolunteer,
  Volunteer,
} from "@/types/volunteers";

// api
import { listVolunteer } from "@/api/volunteers";

export const useListVolunteers = (filters: FiltersVolunteer = {}) => {
  return useQuery<Volunteer[], AxiosError<ApiErrorResponse>, FiltersVolunteer>({
    queryKey: ["volunteers"],
    queryFn: () => listVolunteer(filters),
  });
};
