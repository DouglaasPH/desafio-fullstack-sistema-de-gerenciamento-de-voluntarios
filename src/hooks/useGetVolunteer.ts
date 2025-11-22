// tanstack react-query
import { useQuery } from "@tanstack/react-query";

// axios
import type { AxiosError } from "axios";

// types
import type { ApiErrorResponse, Volunteer } from "@/types/volunteers";

// api
import { getVolunteer } from "@/api/volunteers";

export const useGetVolunteer = (volunteer_id: number) => {
  return useQuery<Volunteer, AxiosError<ApiErrorResponse>, Volunteer>({
    queryKey: ["volunteer", volunteer_id], // query key única por ID
    queryFn: () => getVolunteer(volunteer_id),
    enabled: !!volunteer_id, // evita rodar sem ID
  });
};
