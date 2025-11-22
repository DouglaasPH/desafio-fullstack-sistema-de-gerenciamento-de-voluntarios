// tanstack react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// axios
import type { AxiosError } from "axios";

// types
import type { ApiErrorResponse, Volunteer } from "@/types/volunteers";

// api
import { deleteVolunteer } from "@/api/volunteers";

export const useSoftDeleteVolunteers = () => {
  const queryClient = useQueryClient();

  return useMutation<Volunteer, AxiosError<ApiErrorResponse>, number>({
    mutationFn: (volunteer_id: number) => deleteVolunteer(volunteer_id),
    onSuccess: () => {
      // Atualiza cache dos voluntários após deletar
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
};
