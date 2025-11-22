import ErrorPage from "@/components/ErrorPage/ErrorPage";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/volunteers";

function renderError(error?: AxiosError<ApiErrorResponse>) {
  if (!error) return null;

  const statusCode = error.response?.status || 500;
  const message =
    error.response?.data?.detail ||
    "Erro inesperado. Tente novamente mais tarde.";

  return <ErrorPage code={statusCode} message={message} />;
}

export default renderError;
