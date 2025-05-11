import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";

export function ComplementarCard() {
  return (
    <Card title="Complementar solicitação">
      <div className="flex flex-col gap-y-4">
        <FileUpload name="#TODO" label="Enviar arquivo" />
        <Button className="mt-5">Anexar novo arquivo</Button>
      </div>
    </Card>
  );
}
