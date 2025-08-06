import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documentos</h1>
          <p className="text-muted-foreground text-sm">
            Aqui você pode visualizar ou anexar documentos relacionados aos seus negócios.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/documentos/novo">Novo Documento</Link>
        </Button>
      </div>

      <div className="border rounded-lg p-4 text-center text-muted-foreground">
        Nenhum documento encontrado.
      </div>
    </div>
  );
}
