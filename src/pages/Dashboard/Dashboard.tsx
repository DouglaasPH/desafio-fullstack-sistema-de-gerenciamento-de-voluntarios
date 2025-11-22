import SelectField from "@/components/global/SelectField";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFilteredVolunteers } from "@/hooks/useFilteredVolunteers";
import { useListVolunteers } from "@/hooks/useListVolunteers";
import { getAllPositions } from "@/utils/volunteer";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoFound from "@/components/dashboard/NoFound";
import VolunteersTable from "@/components/dashboard/VolunteersTable";
import renderError from "@/utils/errorHandler";

function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("Todos os cargos");
  const [status, setStatus] = useState("Todos os status");
  const [availability, setAvailability] = useState("Todas as disponibilidades");

  const {
    data: volunteers = [],
    isLoading,
    isError,
    error,
  } = useListVolunteers();

  const allPositions = useMemo(() => getAllPositions(volunteers), [volunteers]);

  const filteredVolunteers = useFilteredVolunteers(
    volunteers,
    search,
    status,
    position,
    availability
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) renderError(error);

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

          <SelectField
            value={status}
            onChange={setStatus}
            options={["Todos os status", "Ativo", "Inativo"]}
          />
          <SelectField
            value={position}
            onChange={setPosition}
            options={["Todos os cargos", ...allPositions]}
          />
          <SelectField
            value={availability}
            onChange={setAvailability}
            options={["Todas as disponibilidades", "Manhã", "Tarde", "Noite"]}
          />
        </Card>
      </section>
      <section>
        <Card className="w-full">
          {filteredVolunteers.length > 0 ? (
            <VolunteersTable filteredVolunteers={filteredVolunteers} />
          ) : (
            <NoFound />
          )}
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
