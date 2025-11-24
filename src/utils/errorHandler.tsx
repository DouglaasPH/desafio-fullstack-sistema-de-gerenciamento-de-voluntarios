// axios
import type { AxiosError } from "axios";

// components
import ErrorPage from "@/components/ErrorPage/ErrorPage";

// types
import type { ApiErrorResponse } from "@/types/volunteers";

function renderError(error?: AxiosError<ApiErrorResponse>) {
  console.log(error);
  if (!error) return null;

  const statusCode = error.response?.status || 500;
  const message =
    error.response?.data?.detail ||
    "Erro inesperado. Tente novamente mais tarde.";

  console.log(statusCode, message);
  return <ErrorPage code={statusCode} message={message} />;
}

export default renderError;
