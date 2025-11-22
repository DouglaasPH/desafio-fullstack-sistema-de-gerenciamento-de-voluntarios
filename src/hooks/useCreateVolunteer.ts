// tanstack react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// axios
import type { AxiosError } from "axios";

// types
import type {
  ApiErrorResponse,
  CreateVolunteerData,
  Volunteer,
} from "@/types/volunteers";

// api
import { createVolunteer } from "@/api/volunteers";

export const useCreateVolunteer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Volunteer,
    AxiosError<ApiErrorResponse>,
    CreateVolunteerData
  >({
    mutationFn: (data: CreateVolunteerData) => createVolunteer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
};
