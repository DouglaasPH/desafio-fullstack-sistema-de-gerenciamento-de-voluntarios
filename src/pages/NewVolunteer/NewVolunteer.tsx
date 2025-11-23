import GlobalAlert from "@/components/global/GlobalAlert";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateVolunteer } from "@/hooks/useCreateVolunteer";
import type { CreateVolunteerData } from "@/types/volunteers";
import renderError from "@/utils/errorHandler";
import { formatTelefone, validateEmail, validateTelefone } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewVolunteer() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargoPretendido, setCargoPretendido] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isValidEmail, setIsValidEmail] = useState<null | true | false>(null);
  const [isValidTelefone, setIsValidTelefone] = useState<null | true | false>(
    null
  );
  const [viewAlert, setViewAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState({
    title: "",
    description: "",
  });
  const [showError, setShowError] = useState(false);

  const { mutate: createVolunteer, status, error } = useCreateVolunteer();

  const handleCreateVolunteer = () => {
    if (
      nome == "" ||
      cargoPretendido == "" ||
      disponibilidade == "" ||
      isValidEmail !== true ||
      isValidTelefone !== true
    ) {
      setViewAlert(true);
      setContentAlert({
        title: "Não foi possível cadastrar voluntário.",
        description:
          "Para cadastrar voluntário é necessário preencher corretamente todos campos abaixo.",
      });
      setTimeout(() => {
        setViewAlert(false);
      }, 5000);
      return;
    }

    const data: CreateVolunteerData = {
      nome: "",
      email: "",
      telefone: "",
      cargo_pretendido: "",
      disponibilidade: "",
    };

    if (nome.length > 0) data.nome = nome;
    if (cargoPretendido.length > 0) data.cargo_pretendido = cargoPretendido;
    if (disponibilidade.length > 0) data.disponibilidade = disponibilidade;
    if (isValidTelefone) data.telefone = telefone;
    if (isValidEmail) data.email = email;
    createVolunteer(data);
  };

  useEffect(() => {
    if (
      status === "error" &&
      error &&
      error.response?.status === 409 &&
      error.response?.data?.detail ===
        "O email pertence a um voluntário cadastrado."
    ) {
      // adiando o setState para o próximo tick
      const timer = setTimeout(() => {
        setViewAlert(true);
        setContentAlert({
          title: "Não foi possível cadastrar voluntário.",
          description:
            "O email inserido pertence a um voluntário. Por favor, tente outro.",
        });

        // esconde após 5s
        const hideTimer = setTimeout(() => setViewAlert(false), 5000);

        // limpa hideTimer se o componente desmontar
        return () => clearTimeout(hideTimer);
      }, 0);

      // limpa timer se o componente desmontar antes de setar o state
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [status, error]);

  if (status === "pending") return <LoadingScreen />;
  if (status === "success") navigate("/");
  if (showError) {
    return renderError(error ?? undefined);
  }

  return (
    <main className="w-full flex flex-col p-10 gap-8">
      {viewAlert ? (
        <div className="absolute w-full flex justify-center top-10 transition-all duration-300  -translate-y-5 opacity-0 animate-[slideDown_0.3s_ease_forwards]">
          <GlobalAlert
            title={contentAlert.title}
            description={contentAlert.description}
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
            <h1 className="font-bold text-2xl lg:text-3xl">Novo Voluntário</h1>
            <p className="text-sm text-gray-500">
              Preencha os dados para cadastrar um novo voluntário
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
                {isValidEmail || isValidEmail == null ? null : (
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
              <div className="flex gap-5 items-center">
                <label className="text-sm text-gray-800">Telefone * </label>
                {!isValidTelefone && isValidTelefone !== null ? (
                  <span className="text-[0.6rem] bg-red-500 text-white px-3 py-1 rounded-md">
                    Telefone inválido
                  </span>
                ) : null}
              </div>
              <Input
                type="text"
                placeholder="(11) 98765-4321"
                className="placeholder:text-gray-400"
                value={telefone}
                onChange={(e) => {
                  if (e.target.value.length > 15) return;
                  if (e.target.value.length > 0) {
                    const formatted = formatTelefone(e.target.value);
                    setTelefone(formatted);
                  } else {
                    setTelefone(e.target.value);
                  }
                  // Reset do estado de validação enquanto digita
                  setIsValidTelefone(null);
                }}
                onBlur={() => {
                  // Valida ao sair do campo
                  if (telefone.length > 0) {
                    setIsValidTelefone(validateTelefone(telefone));
                  }
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-gray-800">
                Cargo Pretendido *
              </label>
              <Select
                value={cargoPretendido}
                onValueChange={setCargoPretendido}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{cargoPretendido}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Product Owner Jr">
                      Product Owner Jr
                    </SelectItem>
                    <SelectItem value="UI/UX Designer Jr">
                      UI/UX Designer Jr
                    </SelectItem>
                    <SelectItem value="Frontend Jr">Frontend Jr</SelectItem>
                    <SelectItem value="Backend Jr">Backend Jr</SelectItem>
                    <SelectItem value="Full Stack Jr">Full Stack Jr</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-gray-800">Disponibildiade *</label>
              <Select
                value={disponibilidade}
                onValueChange={setDisponibilidade}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{disponibilidade}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Manhã">Manhã</SelectItem>
                    <SelectItem value="Tarde">Tarde</SelectItem>
                    <SelectItem value="Noite">Noite</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              onClick={handleCreateVolunteer}
            >
              Cadastar Voluntário
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default NewVolunteer;
