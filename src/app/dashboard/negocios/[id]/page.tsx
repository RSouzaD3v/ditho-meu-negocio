'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Business {
  id: string;
  name: string;
  cnpj?: string;
  niche?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: string;
}

export default function NegocioDetalhesPage() {
  const { id } = useParams();
  const router = useRouter();
  const [negocio, setNegocio] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNegocio() {
      try {
        const res = await fetch(`/api/business/${id}`);
        if (!res.ok) {
          router.push('/dashboard/negocios');
          return;
        }
        const data = await res.json();
        setNegocio(data);
      } catch (err) {
        console.error('Erro ao carregar negócio:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchNegocio();
  }, [id, router]);

  if (loading) return <p>Carregando...</p>;

  if (!negocio) {
    return <p>Negócio não encontrado.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{negocio.name}</h1>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/negocios/${negocio.id}/editar`}>Editar</Link>
        </Button>
        <Button variant="secondary" asChild>
            <Link href={`/dashboard/negocios/${negocio.id}/documentos`}>
                Ver Documentos
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {negocio.description && (
          <div>
            <strong>Descrição:</strong>
            <p className="text-muted-foreground">{negocio.description}</p>
          </div>
        )}
        {negocio.cnpj && (
          <p>
            <strong>CNPJ:</strong> {negocio.cnpj}
          </p>
        )}
        {negocio.phoneNumber && (
          <p>
            <strong>Telefone:</strong> {negocio.phoneNumber}
          </p>
        )}
        {negocio.email && (
          <p>
            <strong>Email:</strong> {negocio.email}
          </p>
        )}
        {negocio.website && (
          <p>
            <strong>Website:</strong> {negocio.website}
          </p>
        )}
        {negocio.address && (
          <p>
            <strong>Endereço:</strong> {negocio.address}, {negocio.city} - {negocio.state}
          </p>
        )}
        {negocio.zipCode && (
          <p>
            <strong>CEP:</strong> {negocio.zipCode}
          </p>
        )}
        {negocio.country && (
          <p>
            <strong>País:</strong> {negocio.country}
          </p>
        )}
      </div>
    </div>
  );
}
