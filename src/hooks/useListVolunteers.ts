import { useQuery } from "@tanstack/react-query";
import { listVolunteer } from "@/api/volunteers";
import type { Volunteer } from "@/types/volunteers";

export const useListVolunteers = () => {
  return useQuery<Volunteer[], Error>({
    queryKey: ["volunteers"],
    queryFn: () => listVolunteer({}),
  });
};
