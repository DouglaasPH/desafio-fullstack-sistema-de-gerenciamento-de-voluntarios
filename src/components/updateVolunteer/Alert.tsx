import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComp() {
  return (
    <Alert variant="destructive" className="w-md">
      <AlertCircleIcon />
      <AlertTitle>Não foi possível atualizar voluntário.</AlertTitle>
      <AlertDescription>
        <p>
          Para atualizar voluntário é necessário alterar corretamente ao menos
          um dos campos abaixo.
        </p>
      </AlertDescription>
    </Alert>
  );
}

export default AlertComp;
