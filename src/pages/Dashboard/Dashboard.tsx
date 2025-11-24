// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// shadcn
import { Button } from "@/components/ui/button";

// lucide
import { Plus } from "lucide-react";

// components
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import DashboardTable from "@/components/dashboard/DashboardTable";
import DashboardFilter from "@/components/dashboard/DashboardFilter";

// hooks
import { useFilteredVolunteers } from "@/hooks/useFilteredVolunteers";
import { useListVolunteers } from "@/hooks/useListVolunteers";
import { useSoftDeleteVolunteers } from "@/hooks/useSoftDeleteVolunteers";

// utils
import renderError from "@/utils/errorHandler";

// types
import type { Filters } from "@/types/volunteers";

function Dashboard() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    position: "Todos os cargos",
    status: "Todos os status",
    availability: "Todas as disponibilidades",
  });

  const navigate = useNavigate();

  const {
    mutate: softDelete,
    status: softDeleteStatus,
    error: softDeleteError,
  } = useSoftDeleteVolunteers();

  const {
    data: volunteers = [],
    isLoading,
    isError,
    error: listVolunteersError,
  } = useListVolunteers();

  const filteredVolunteers = useFilteredVolunteers(
    volunteers,
    filters.search,
    filters.status,
    filters.position,
    filters.availability
  );

  if (isLoading || softDeleteStatus == "pending") return <LoadingScreen />;
  if (isError || softDeleteStatus === "error")
    return renderError(listVolunteersError ?? softDeleteError ?? undefined);

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

      <DashboardFilter filters={filters} setFilters={setFilters} />

      <DashboardTable
        filteredVolunteers={filteredVolunteers}
        softDelete={softDelete}
      />

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
