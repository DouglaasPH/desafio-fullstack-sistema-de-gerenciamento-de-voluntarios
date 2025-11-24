// react
import { type Dispatch, type SetStateAction } from "react";

// shadcn
import { Card } from "../ui/card";
import { Input } from "../ui/input";

// components
import SelectField from "../global/SelectField";

// types
import type { Filters } from "@/types/volunteers";

// constants
import { CARGOS, DISPONIBILIDADES, STATUS } from "@/constants/volunteer";

interface Props {
  setFilters: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
}

function DashboardFilter({ filters, setFilters }: Props) {
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
          label=""
          value={filters.status}
          onChange={(v) => updateFilter("status", v)}
          options={["Todos os status", ...STATUS]}
        />
        <SelectField
          label=""
          value={filters.position}
          onChange={(v) => updateFilter("position", v)}
          options={["Todos os cargos", ...CARGOS]}
        />
        <SelectField
          label=""
          value={filters.availability}
          onChange={(v) => updateFilter("availability", v)}
          options={["Todas as disponibilidades", ...DISPONIBILIDADES]}
        />
      </Card>
    </section>
  );
}

export default DashboardFilter;
