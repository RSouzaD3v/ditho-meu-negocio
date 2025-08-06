'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  fileUrl?: string;
  createdAt: string;
}

export default function DocumentosPorNegocioPage() {
  const { id } = useParams();
  const [documentos, setDocumentos] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      const res = await fetch(`/api/business/${id}/documents`);
      const data = await res.json();
      setDocumentos(data);
      setLoading(false);
    }

    fetchDocs();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documentos do Negócio</h1>
        <Button asChild>
          <Link href={`/dashboard/negocios/${id}/documentos/novo`}>
            Novo Documento
          </Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : documentos.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center">
          Nenhum documento associado ainda.
        </p>
      ) : (
        <ul className="grid gap-3">
          {documentos.map((doc) => (
            <li
              key={doc.id}
              className="border p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{doc.title}</p>
                {doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline"
                  >
                    Ver Arquivo
                  </a>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(doc.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
