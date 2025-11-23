import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  title: string;
  description: string;
}

export function GlobalAlert({ title, description }: Props) {
  return (
    <Alert variant="destructive" className="w-md">
      <AlertCircleIcon />
      <AlertTitle>
        <span>{title}</span>
      </AlertTitle>
      <AlertDescription>
        <p>{description}</p>
      </AlertDescription>
    </Alert>
  );
}

export default GlobalAlert;
