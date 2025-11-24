// react
import { useNavigate } from "react-router-dom";

// lucide
import { ArrowLeft } from "lucide-react";

// shadcn
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// components
import GlobalAlert from "@/components/global/GlobalAlert";
import InputField from "@/components/global/InputField";
import SelectField from "@/components/global/SelectField";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

// hooks
import { useCreateVolunteerForm } from "@/hooks/useCreateVolunteerForm";

// utils
import renderError from "@/utils/errorHandler";
import { useEffect } from "react";

// constants
import { CARGOS, DISPONIBILIDADES } from "@/constants/volunteer";

function NewVolunteer() {
  const navigate = useNavigate();

  const {
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    status,
    errorCreate,
    alert,
    emailError,
    telefoneError,
  } = useCreateVolunteerForm();

  useEffect(() => {
    if (status === "success") navigate("/");
  }, [status]);

  if (isSubmitting) return <LoadingScreen />;
  if (status === "error") {
    return renderError(errorCreate ?? undefined);
  }

  return (
    <main className="w-full flex flex-col p-10 gap-8">
      {alert && (
        <div className="absolute w-full flex justify-center top-10 transition-all duration-300  -translate-y-5 opacity-0 animate-[slideDown_0.3s_ease_forwards]">
          <GlobalAlert title={alert.title} description={alert.description} />
        </div>
      )}
      <section className="">
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
          <div className="flex flex-col gap-3 w-55 lg:w-auto">
            <h1 className="font-bold text-2xl lg:text-3xl">Novo Voluntário</h1>
            <p className="text-sm text-gray-500">
              Preencha os dados para cadastrar um novo voluntário
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
            <InputField
              label="Nome *"
              value={form.nome}
              placeholder="Nome completo"
              type="text"
              error={null}
              onChange={(v: string) => handleChange("nome", v)}
              onBlur={() => null}
            />
            <InputField
              label="Email *"
              value={form.email}
              placeholder="email@example.com"
              type="email"
              error={emailError}
              onChange={(v: string) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
            />
            <InputField
              label="Telefone *"
              value={form.telefone}
              placeholder="(11) 98765-4321"
              type="text"
              error={telefoneError}
              onChange={(v: string) => handleChange("telefone", v)}
              onBlur={() => handleBlur("telefone")}
            />
            <SelectField
              label="Cargo Pretendido *"
              value={form.cargo_pretendido}
              options={CARGOS}
              onChange={(v) => handleChange("cargo_pretendido", v)}
            />
            <SelectField
              label="Disponibilidade *"
              value={form.disponibilidade}
              options={DISPONIBILIDADES}
              onChange={(v) => handleChange("disponibilidade", v)}
            />
          </div>
          <div className="flex justify-end gap-5">
            <Button
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-500 cursor-pointer"
              onClick={handleSubmit}
            >
              Cadastrar Voluntário
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default NewVolunteer;
