'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Business {
  id: string;
  name: string;
  city?: string;
  state?: string;
  createdAt: string;
}

export default function NegociosPage() {
  const { data: session } = useSession();
  const [negocios, setNegocios] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNegocios() {
      try {
        const res = await fetch('/api/business', { cache: 'no-store' });
        const data = await res.json();
        setNegocios(data);
      } catch (err) {
        console.error('Erro ao buscar negócios:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNegocios();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meus Negócios</h1>
          <p className="text-muted-foreground text-sm">
            Aqui estão os negócios que você cadastrou.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/negocios/novo">Novo Negócio</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : negocios.length === 0 ? (
        <div className="border rounded-lg p-4 text-center text-muted-foreground">
          Nenhum negócio cadastrado ainda.
        </div>
      ) : (
        <ul className="grid gap-4">
          {negocios.map((n) => (
            <li
              key={n.id}
              className="border p-4 rounded-lg hover:bg-muted transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{n.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {n.city} {n.state && `- ${n.state}`}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/negocios/${n.id}`}>Detalhes</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
