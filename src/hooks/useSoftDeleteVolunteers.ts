import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVolunteer } from "@/api/volunteers";

export const useSoftDeleteVolunteers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (volunteer_id: number) => deleteVolunteer(volunteer_id),
    onSuccess: () => {
      // Atualiza cache dos voluntários após deletar
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
};
