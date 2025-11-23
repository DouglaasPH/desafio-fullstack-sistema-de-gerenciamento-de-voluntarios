import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Volunteer } from "@/types/volunteers";
import VolunteerRow from "./VolunteerRow";
import { useSoftDeleteVolunteers } from "@/hooks/useSoftDeleteVolunteers";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorPage from "../ErrorPage/ErrorPage";

interface Props {
  filteredVolunteers: Volunteer[];
}

function VolunteersTable({ filteredVolunteers }: Props) {
  const { mutate: softDelete, status, error } = useSoftDeleteVolunteers();

  const handleDeleteVolunteer = (id: number) => {
    softDelete(id); // chama a mutação
  };

  if (status == "pending") return <LoadingScreen />;
  if (status === "error") {
    // Código HTTP
    const statusCode = error.response?.status || 500;
    // Mensagem retornada pelo servidor
    const message = error.response?.data?.message || error.message;
    return <ErrorPage code={statusCode} message={message} />;
  }

  return (
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
            key={volunteer.id}
            volunteer={volunteer}
            onDelete={handleDeleteVolunteer}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default VolunteersTable;
