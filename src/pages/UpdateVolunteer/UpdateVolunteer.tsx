import SelectField from "@/components/global/SelectField";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GlobalAlert from "@/components/global/GlobalAlert";
import { useGetVolunteer } from "@/hooks/useGetVolunteer";
import { useUpdateVolunteer } from "@/hooks/useUpdateVolunteer";
import type { UpdateVolunteer } from "@/types/volunteers";
import { validateEmail } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import renderError from "@/utils/errorHandler";

function UpdateVolunteerPage() {
  const { volunteer_id } = useParams();
  const {
    data: volunteer,
    isLoading,
    isError,
    error: errorGetVolunteer,
  } = useGetVolunteer(Number(volunteer_id));

  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<null | true | false>(null);
  const [cargoPretendido, setCargoPretendido] = useState<string>("");
  const [disponibilidade, setDisponibilidade] = useState<string>("");
  const [viewAlert, setViewAlert] = useState(false);

  useEffect(() => {
    if (!volunteer) return;

    const syncForm = () => {
      setNome(volunteer.nome);
      setEmail(volunteer.email);
      setCargoPretendido(volunteer.cargo_pretendido);
      setDisponibilidade(volunteer.disponibilidade);
      setIsValidEmail(true);
    };

    syncForm();
  }, [volunteer]);

  const {
    mutate: updateVolunteer,
    status,
    error: errorUpdateVolunteer,
  } = useUpdateVolunteer();

  const handleUpdateVolunteer = () => {
    if (
      (nome == "" || nome === volunteer?.nome) &&
      (cargoPretendido == "" ||
        cargoPretendido === volunteer?.cargo_pretendido) &&
      (disponibilidade == "" ||
        disponibilidade === volunteer?.disponibilidade) &&
      (isValidEmail !== true || email === volunteer?.email)
    ) {
      setViewAlert(true);
      setTimeout(() => {
        setViewAlert(false);
      }, 5000);
      return;
    }

    const data: UpdateVolunteer = {};

    if (nome.length > 0 && nome !== volunteer?.nome) data.nome = nome;
    if (
      cargoPretendido.length > 0 &&
      cargoPretendido !== volunteer?.cargo_pretendido
    )
      data.cargo_pretendido = cargoPretendido;
    if (
      disponibilidade.length > 0 &&
      disponibilidade !== volunteer?.disponibilidade
    )
      data.disponibilidade = disponibilidade;
    if (isValidEmail && email !== volunteer?.email) data.email = email;

    updateVolunteer({ volunteer_id: Number(volunteer?.id), data });
  };

  if (status === "pending" || isLoading) return <LoadingScreen />;
  if (status === "error" || isError)
    return renderError(errorUpdateVolunteer ?? errorGetVolunteer ?? undefined);
  if (status === "success") navigate("/");

  return (
    <main className="w-full flex flex-col p-10 gap-8">
      {viewAlert ? (
        <div className="absolute w-full flex justify-center top-10 transition-all duration-300  -translate-y-5 opacity-0 animate-[slideDown_0.3s_ease_forwards]">
          <GlobalAlert
            title={"Não foi possível atualizar voluntário."}
            description={
              "Para atualizar voluntário é necessário alterar corretamente ao menos um dos campos abaixo."
            }
          />
        </div>
      ) : null}
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-5 items-center">
                <label className="text-sm text-gray-800">Email * </label>
                {isValidEmail && isValidEmail !== null ? null : (
                  <span className="text-[0.6rem] bg-red-500 text-white px-3 py-1 rounded-md">
                    Email inválido
                  </span>
                )}
              </div>
              <Input
                type="email"
                placeholder="email@example.com"
                className="placeholder:text-gray-400"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Reset do estado de validação enquanto digita
                  setIsValidEmail(null);
                }}
                onBlur={() => {
                  // Valida ao sair do campo
                  if (email.length > 0) {
                    setIsValidEmail(validateEmail(email));
                  }
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-gray-800">
                Cargo Pretendido *
              </label>
              <SelectField
                value={cargoPretendido}
                onChange={setCargoPretendido}
                options={[
                  "Product Owner Jr",
                  "UI/UX Designer Jr",
                  "Frontend Jr",
                  "Backend Jr",
                  "Full Stack Jr",
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-gray-800">Disponibildiade *</label>
              <SelectField
                value={disponibilidade}
                onChange={setDisponibilidade}
                options={["Manhã", "Tarde", "Noite"]}
              />
            </div>
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
              onClick={() => handleUpdateVolunteer()}
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
