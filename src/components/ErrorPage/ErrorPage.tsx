interface ErrorPageProps {
  code?: number; // Código do erro HTTP
  message?: string; // Mensagem descritiva
}

function ErrorPage({
  code = 404,
  message = "Página não encontrada",
}: ErrorPageProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">{code}</h1>
      <p className="text-2xl mb-8">{message}</p>
    </div>
  );
}

export default ErrorPage;
