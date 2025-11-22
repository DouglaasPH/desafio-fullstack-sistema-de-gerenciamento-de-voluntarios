import type { Volunteer } from "@/types/volunteers";
import { TableCell, TableRow } from "../ui/table";
import { CircleX, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function VolunteerRow({
  volunteer,
  onDelete,
}: {
  volunteer: Volunteer;
  onDelete: (id: number) => void;
}) {
  const navigate = useNavigate();

  return (
    <TableRow key={volunteer.id}>
      <TableCell className="pl-10 text-gray-700 inter font-medium">
        {volunteer.nome}
      </TableCell>
      <TableCell className="px-5 py-5">{volunteer.email}</TableCell>
      <TableCell className="px-5 py-5">{volunteer.telefone}</TableCell>
      <TableCell className="px-5 py-5">{volunteer.cargo_pretendido}</TableCell>
      <TableCell className="px-5 py-5">{volunteer.disponibilidade}</TableCell>
      <TableCell className="px-5 py-5">
        <span
          className={
            volunteer.status == "ativo"
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
          {volunteer.status === "ativo" ? (
            <>
              <button
                className="cursor-pointer"
                onClick={() => navigate(`/update-volunteer/${volunteer.id}`)}
              >
                <Pencil strokeWidth={2.5} size={18} className="text-gray-600" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => onDelete(volunteer.id)}
              >
                <CircleX
                  strokeWidth={2.5}
                  size={18}
                  className="text-gray-600"
                />
              </button>
            </>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => navigate(`/update-volunteer/${volunteer.id}`)}
            >
              <Pencil strokeWidth={2.5} size={18} className="text-gray-600" />
            </button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default VolunteerRow;
