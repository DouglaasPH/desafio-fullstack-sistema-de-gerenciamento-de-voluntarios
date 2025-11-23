// react
import { useMemo, type Dispatch, type SetStateAction } from "react";

// shadcn
import { Card } from "../ui/card";
import { Input } from "../ui/input";

// components
import SelectField from "../global/SelectField";

// utils
import { getAllPositions } from "@/utils/volunteer";

// types
import type { Filters, Volunteer } from "@/types/volunteers";

interface Props {
  volunteers: Volunteer[];
  setFilters: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
}

function DashboardFilter({ volunteers, filters, setFilters }: Props) {
  const allPositions = useMemo(() => getAllPositions(volunteers), [volunteers]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section>
      <Card className="w-full h-full px-7 grid grid-cols-1 lg:grid-cols-4">
        <Input
          placeholder="Buscar por nome ou email"
          value={filters.search}
          onChange={(v) => updateFilter("search", v.target.value)}
          className="w-full lg:w-auto placeholder:text-gray-300"
        />

        <SelectField
          value={filters.status}
          onChange={(v) => updateFilter("status", v)}
          options={["Todos os status", "Ativo", "Inativo"]}
        />
        <SelectField
          value={filters.position}
          onChange={(v) => updateFilter("position", v)}
          options={["Todos os cargos", ...allPositions]}
        />
        <SelectField
          value={filters.availability}
          onChange={(v) => updateFilter("availability", v)}
          options={["Todas as disponibilidades", "Manhã", "Tarde", "Noite"]}
        />
      </Card>
    </section>
  );
}

export default DashboardFilter;
