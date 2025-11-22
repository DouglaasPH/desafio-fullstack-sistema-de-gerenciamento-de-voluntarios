import ErrorPage from "@/components/ErrorPage/ErrorPage";
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
import { useUpdateVolunteer } from "@/hooks/useUpdateVolunteer";
import type { UpdateVolunteer } from "@/types/volunteers";
import { validateEmail } from "@/utils/validators";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateVolunteer() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState<null | true | false>(null);
  const [cargoPretendido, setCargoPretendido] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const { volunteer_id } = useParams();

  const { mutate: updateVolunteer, status, error } = useUpdateVolunteer();

  const handleUpdateVolunteer = () => {
    const data: UpdateVolunteer = {};
    if (nome.length > 0) data.nome = nome;
    if (email.length > 0) {
      const validate = validateEmail(email);
      if (validate) data.email = email;
      else setIsValidEmail(false);
    }
    if (cargoPretendido.length > 0) data.cargo_pretendido = cargoPretendido;
    if (disponibilidade.length > 0) data.disponibilidade = disponibilidade;

    if (
      nome == "" &&
      email == "" &&
      cargoPretendido == "" &&
      disponibilidade == ""
    )
      return;
    const id = Number(volunteer_id);
    updateVolunteer({ volunteer_id: id, data }); // chama a mutação
  };

  if (status === "pending") return <LoadingScreen />;
  if (status === "error") {
    // Código HTTP
    const statusCode = error.response?.status || 500;
    // Mensagem retornada pelo servidor
    const message = error.response?.data?.message || error.message;
    return <ErrorPage code={statusCode} message={message} />;
  }
  if (status === "success") navigate("/");

  return (
    <main className="w-full flex flex-col p-10 gap-8">
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
                {isValidEmail ? (
                  <span className="text-[0.6rem] bg-red-500 text-white px-3 py-1 rounded-md">
                    Invalid Email
                  </span>
                ) : null}
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
                    setIsValidEmail(!validateEmail(email));
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
            <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer">
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

export default UpdateVolunteer;
