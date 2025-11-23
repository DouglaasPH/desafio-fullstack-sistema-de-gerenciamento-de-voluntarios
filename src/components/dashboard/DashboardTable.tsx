// shadcn
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";

// components
import VolunteerRow from "./DashboardTableRow";

// types
import type { Volunteer } from "@/types/volunteers";
import DashboardTableNoFound from "./DashboardTableNoFound";

interface Props {
  filteredVolunteers: Volunteer[];
  softDelete: (id: number) => void;
}

function DashboardTable({ filteredVolunteers, softDelete }: Props) {
  const tableHeaders = [
    "Nome",
    "Email",
    "Telefone",
    "Cargo",
    "Disponibilidade",
    "Status",
    "Data de inscrição",
    "Ações",
  ];

  const handleDeleteVolunteer = (volunteer_id: number) => {
    softDelete(volunteer_id); // chama a mutação
  };

  if (filteredVolunteers.length === 0) return <DashboardTableNoFound />;

  return (
    <section>
      <Card className="w-full">
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableRow className="w-full">
              {tableHeaders.map((head) => (
                <TableHead
                  key={head}
                  className={`text-sm font-regular text-gray-500 ${
                    head === "Nome"
                      ? "pl-10"
                      : head === "Ações"
                      ? "text-end pr-10"
                      : "px-5"
                  }`}
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-regular text-gray-500">
            {filteredVolunteers.map((volunteer) => (
              <VolunteerRow
                key={volunteer.id}
                volunteer={volunteer}
                onDelete={handleDeleteVolunteer}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

export default DashboardTable;
