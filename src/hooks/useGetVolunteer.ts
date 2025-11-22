import { useQuery } from "@tanstack/react-query";
import { getVolunteer } from "@/api/volunteers";
import type { Volunteer } from "@/types/volunteers";

export const useGetVolunteer = (volunteer_id: number) => {
  return useQuery<Volunteer, Error>({
    queryKey: ["volunteer", volunteer_id], // query key única por ID
    queryFn: () => getVolunteer(volunteer_id),
    enabled: !!volunteer_id, // evita rodar sem ID
  });
};
