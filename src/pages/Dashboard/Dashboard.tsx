import SelectFilter from "@/components/dashboard/SelectFilter";
import VolunteerRow from "@/components/dashboard/VolunteerRow";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFilteredVolunteers } from "@/hooks/useFilteredVolunteers";
import { useSoftDeleteVolunteers } from "@/hooks/useSoftDeleteVolunteers";
import { useListVolunteers } from "@/hooks/useListVolunteers";
import { getAllPositions } from "@/utils/volunteer";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("Todos os cargos");
  const [status, setStatus] = useState("Todos os status");
  const [availability, setAvailability] = useState("Todas as disponibilidades");

  const { data: volunteers = [], isLoading, isError } = useListVolunteers();

  const allPositions = useMemo(() => getAllPositions(volunteers), [volunteers]);

  const filteredVolunteers = useFilteredVolunteers(
    volunteers,
    search,
    status,
    position,
    availability
  );

  const { mutate: softDelete } = useSoftDeleteVolunteers();

  const handleDeleteVolunteer = (id: number) => {
    softDelete(id); // chama a mutação
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage code={500} message="Internal server error" />;

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
        <Button
          className="bg-blue-600 hover:bg-blue-500  text-white flex flex-row items-center gap-4 cursor-pointer"
          onClick={() => navigate("/new-volunteer")}
        >
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

          <SelectFilter
            value={status}
            onChange={setStatus}
            options={["Todos os status", "Ativo", "Inativo"]}
          />
          <SelectFilter
            value={position}
            onChange={setPosition}
            options={["Todos os cargos", ...allPositions]}
          />
          <SelectFilter
            value={availability}
            onChange={setAvailability}
            options={["Todas as disponibilidades", "Manhã", "Tarde", "Noite"]}
          />
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
              {filteredVolunteers.map((volunteer) => (
                <VolunteerRow
                  volunteer={volunteer}
                  onDelete={handleDeleteVolunteer}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
      <section>
        <p>
          Mostrando {filteredVolunteers.length} de {volunteers.length}{" "}
          voluntários
        </p>
      </section>
    </main>
  );
}

export default Dashboard;
