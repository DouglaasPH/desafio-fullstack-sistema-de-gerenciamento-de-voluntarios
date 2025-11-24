// react

import { useNavigate, useParams } from "react-router-dom";
// shadcn
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// lucide
import { ArrowLeft } from "lucide-react";

// components
import SelectField from "@/components/global/SelectField";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import GlobalAlert from "@/components/global/GlobalAlert";

// hooks
import { useUpdateVolunteerForm } from "@/hooks/useUpdateVolunteerForm";
import { useGetVolunteer } from "@/hooks/useGetVolunteer";

// utils
import renderError from "@/utils/errorHandler";

function UpdateVolunteerPage() {
  const { volunteer_id } = useParams();

  const {
    data: volunteer,
    isLoading,
    isError,
    error: errorGetVolunteer,
  } = useGetVolunteer(Number(volunteer_id));

  const {
    form,
    status,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errorUpdate,
    alert,
  } = useUpdateVolunteerForm(volunteer);

  const navigate = useNavigate();

  if (isSubmitting || isLoading) return <LoadingScreen />;
  if (status === "error" || isError)
    return renderError(errorUpdate ?? errorGetVolunteer ?? undefined);
  if (status === "success") navigate("/");

  return (
    <main className="w-full flex flex-col p-10 gap-8">
      {alert && (
        <div className="absolute w-full flex justify-center top-10 transition-all duration-300  -translate-y-5 opacity-0 animate-[slideDown_0.3s_ease_forwards]">
          <GlobalAlert title={alert.title} description={alert.description} />
        </div>
      )}

      <section>
        <button
          className="flex flex-row gap-5 text-sm items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeft strokeWidth={3} size={20} />
          <span>Voltar para lista</span>
        </button>
      </section>
      <section>
        <Card className="p-10 flex flex-col justify-between">
          <div className="flex flex-col gap-3 w-auto">
            <h1 className="font-bold text-2xl lg:text-3xl">
              Atualizar Voluntário
            </h1>
            <p className="text-sm text-gray-500">
              Preencha os dados que deseja atualizar do voluntário
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-gray-800">Nome *</label>
              <Input
                placeholder="Nome completo"
                className="placeholder:text-gray-400"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-5 items-center">
                <label className="text-sm text-gray-800">Email * </label>
                {errors.email && (
                  <span className="text-[0.6rem] bg-red-500 text-white px-3 py-1 rounded-md">
                    Email inválido
                  </span>
                )}
              </div>
              <Input
                type="email"
                placeholder="email@example.com"
                className="placeholder:text-gray-400"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => handleBlur(e.target.value)}
              />
            </div>

            <SelectField
              label="Cargo Pretendido *"
              value={form.cargo_pretendido}
              onChange={(option) => handleChange("cargo_pretendido", option)}
              options={[
                "Product Owner Jr",
                "UI/UX Designer Jr",
                "Frontend Jr",
                "Backend Jr",
                "Full Stack Jr",
              ]}
            />

            <SelectField
              label="Disponibilidade *"
              value={form.disponibilidade}
              onChange={(option) => handleChange("disponibilidade", option)}
              options={["Manhã", "Tarde", "Noite"]}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-5">
            <Button
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-500 cursor-pointer"
              onClick={() => handleSubmit()}
            >
              Atualizar Voluntário
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default UpdateVolunteerPage;
