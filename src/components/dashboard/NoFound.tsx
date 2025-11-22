// shadcn/ui
import { CardContent } from "@/components/ui/card";

// lucide
import { Frown } from "lucide-react";

function NoFound() {
  return (
    <div className="flex justify-center items-center w-full py-30">
      <CardContent className="flex flex-col items-center gap-8">
        <div className="bg-gray-100 p-6 rounded-full">
          <Frown className="size-12 text-gray-400" />
        </div>
        <div className="text-center flex flex-col gap-2 w-md">
          <h4 className="font-semibold text-xl text-gray-700">
            Nenhum voluntário encontrado
          </h4>
          <p className="text-gray-400">
            Nenhum voluntário corresponde aos seus filtros atuais, ou você não
            tem voluntários.
          </p>
        </div>
      </CardContent>
    </div>
  );
}

export default NoFound;
