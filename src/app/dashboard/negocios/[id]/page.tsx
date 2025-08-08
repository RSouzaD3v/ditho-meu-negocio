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

  if (loading) return <div className="flex justify-center items-center h-64"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span></div>;

  if (!negocio) {
    return <div className="text-center text-lg text-red-500">Negócio não encontrado.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{negocio.name}</h1>
          {negocio.niche && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
              {negocio.niche}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/negocios/${negocio.id}/editar`}>Editar</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/negocios/${negocio.id}/documentos`}>Ver Documentos</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {negocio.description && (
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-1">Descrição</h2>
            <p className="text-gray-600">{negocio.description}</p>
          </div>
        )}
        {negocio.cnpj && (
          <InfoItem label="CNPJ" value={negocio.cnpj} />
        )}
        {negocio.phoneNumber && (
          <InfoItem label="Telefone" value={negocio.phoneNumber} />
        )}
        {negocio.email && (
          <InfoItem label="Email" value={negocio.email} />
        )}
        {negocio.website && (
          <InfoItem label="Website" value={
            <a href={negocio.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {negocio.website}
            </a>
          } />
        )}
        {(negocio.address || negocio.city || negocio.state) && (
          <InfoItem
            label="Endereço"
            value={
              <>
                {negocio.address}
                {negocio.address && (negocio.city || negocio.state) ? ', ' : ''}
                {negocio.city}
                {negocio.city && negocio.state ? ' - ' : ''}
                {negocio.state}
              </>
            }
          />
        )}
        {negocio.zipCode && (
          <InfoItem label="CEP" value={negocio.zipCode} />
        )}
        {negocio.country && (
          <InfoItem label="País" value={negocio.country} />
        )}
        <InfoItem
          label="Criado em"
          value={new Date(negocio.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col mb-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-800">{value}</span>
    </div>
  );
}
