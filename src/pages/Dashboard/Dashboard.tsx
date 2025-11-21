import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleX, Pencil, Plus } from "lucide-react";
import { useMemo, useState } from "react";

interface Volunteer {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: string;
  disponibilidade: string;
  status: string;
  create_at: string;
}

function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos os status");
  const [position, setPosition] = useState("Todos os cargos");
  const [availability, setAvailability] = useState("Todas as disponibilidades");

  const fake_response: Volunteer[] = [
    {
      id: 1,
      nome: "Douglas Phelipe",
      email: "douglas@gmail.com",
      telefone: "(11) 98765-4321",
      cargo_pretendido: "Backend Jr",
      disponibilidade: "manha",
      status: "Ativo",
      create_at: "2025-11-21T17:15:15.354241Z",
    },
    {
      id: 2,
      nome: "Douglas Phelipe",
      email: "douglas@gmail.com",
      telefone: "(11) 98765-4321",
      cargo_pretendido: "Backend Jr",
      disponibilidade: "manha",
      status: "Ativo",
      create_at: "2025-11-21T17:15:15.354241Z",
    },
    {
      id: 3,
      nome: "Douglas Phelipe",
      email: "douglas@gmail.com",
      telefone: "(11) 98765-4321",
      cargo_pretendido: "Backend Jr",
      disponibilidade: "manha",
      status: "Ativo",
      create_at: "2025-11-21T17:15:15.354241Z",
    },
    {
      id: 4,
      nome: "Douglas Phelipe",
      email: "douglas@gmail.com",
      telefone: "(11) 98765-4321",
      cargo_pretendido: "Backend Jr",
      disponibilidade: "manha",
      status: "Inativo",
      create_at: "2025-11-21T17:15:15.354241Z",
    },
  ];

  function formatVolunteer(v: Volunteer) {
    const capitalize = (s: string) =>
      s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

    const formatDate = (iso: string) => {
      const date = new Date(iso);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(2); // aa
      return `${day}/${month}/${year}`;
    };

    return {
      ...v,
      status: capitalize(v.status),
      create_at: formatDate(v.create_at),
    };
  }

  const allPositions = useMemo(() => {
    const positions = new Set<string>();

    fake_response.forEach((v) => positions.add(v.cargo_pretendido));

    return Array.from(positions);
  }, []);

  return (
    <main className="w-full p-5 lg:p-10 flex flex-col gap-10">
      <section className="flex flex-row justify-between items-end lg:items-center">
        <div className="flex flex-col gap-3 w-55 lg:w-auto">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Gerenciamento de Voluntários
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie cadastros, visualize informações e acompanhe voluntários
          </p>
        </div>
        <Button className="bg-[#2563EB] text-white flex flex-row items-center gap-4 cursor-pointer">
          <Plus strokeWidth={3} className="size-4" />
          <span className="text-sm font-normal">Novo Voluntário</span>
        </Button>
      </section>
      <section>
        <Card className="w-full h-full px-7 grid grid-cols-1 lg:grid-cols-4">
          <Input
            placeholder="Buscar por nome ou email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-auto placeholder:text-gray-300"
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-auto">
              <SelectValue>{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="Todos os status" value="todos os status">
                  Todos os status
                </SelectItem>
                <SelectItem key="Ativo" value="Ativo">
                  Ativo
                </SelectItem>
                <SelectItem key="Inativo" value="Inativo">
                  Inativo
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-full lg:w-auto">
              <SelectValue>{position}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="Todos os cargos" value="Todos os cargos">
                  Todos os cargos
                </SelectItem>
                {allPositions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-full lg:w-auto">
              <SelectValue>{availability}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  key="Todas as disponibilidades"
                  value="Todas as disponibilidades"
                >
                  Todas as disponibilidades
                </SelectItem>
                <SelectItem key="manha" value="Manhã">
                  Manhã
                </SelectItem>
                <SelectItem key="tarde" value="Tarde">
                  Tarde
                </SelectItem>
                <SelectItem key="noite" value="Noite">
                  Noite
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
      </section>
      <section>
        <Card className="w-full">
          <Table className="w-full">
            <TableHeader className="w-full">
              <TableRow className="w-full">
                <TableHead className="text-sm font-regular text-gray-500 pl-10">
                  Nome
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Email
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Telefone
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Cargo
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Disponibilidade
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Status
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 px-5">
                  Data de Inscrição
                </TableHead>
                <TableHead className="text-sm font-regular text-gray-500 text-end pr-10">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm font-regular text-gray-500">
              {fake_response.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="pl-10 text-gray-700 inter font-medium">
                    {volunteer.nome}
                  </TableCell>
                  <TableCell className="px-5 py-5">{volunteer.email}</TableCell>
                  <TableCell className="px-5 py-5">
                    {volunteer.telefone}
                  </TableCell>
                  <TableCell className="px-5 py-5">
                    {volunteer.cargo_pretendido}
                  </TableCell>
                  <TableCell className="px-5 py-5">
                    {volunteer.disponibilidade}
                  </TableCell>
                  <TableCell className="px-5 py-5">
                    <span
                      className={
                        volunteer.status == "Ativo"
                          ? "bg-green-100 px-3 py-1 rounded-lg text-green-600 font-medium text-[0.7rem]"
                          : "bg-gray-100 px-3 py-1 rounded-lg text-gray-600 font-medium text-[0.7rem]"
                      }
                    >
                      {volunteer.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium px-5 py-5">
                    {volunteer.create_at}
                  </TableCell>
                  <TableCell className="pr-10">
                    <div className="flex flex-row items-center justify-end gap-5">
                      {volunteer.status === "Ativo" ? (
                        <>
                          <button className="cursor-pointer">
                            <Pencil
                              strokeWidth={2.5}
                              size={18}
                              className="text-gray-600"
                            />
                          </button>
                          <button className="cursor-pointer">
                            <CircleX
                              strokeWidth={2.5}
                              size={18}
                              className="text-gray-600"
                            />
                          </button>
                        </>
                      ) : (
                        <button className="cursor-pointer">
                          <Pencil
                            strokeWidth={2.5}
                            size={18}
                            className="text-gray-600"
                          />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
      <section>
        <p>Mostrando 5 de 5 voluntários</p>
      </section>
    </main>
  );
}

export default Dashboard;
