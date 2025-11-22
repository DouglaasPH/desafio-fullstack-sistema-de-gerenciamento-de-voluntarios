import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateVolunteer } from "@/types/volunteers";
import { updateVolunteer } from "@/api/volunteers";

type UpdateVolunteerPayload = {
  volunteer_id: number;
  data: UpdateVolunteer;
};

export const useUpdateVolunteer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ volunteer_id, data }: UpdateVolunteerPayload) =>
      updateVolunteer(volunteer_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
};
