import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
      <section className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Ditho Meu Negócio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Um ecossistema para conectar, construir e transformar a presença digital do seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto">
              Entrar
            </Button>
          </Link>

          <Link href="/register">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Criar Conta
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="absolute bottom-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ditho. Todos os direitos reservados.
      </footer>
    </main>
  );
}
