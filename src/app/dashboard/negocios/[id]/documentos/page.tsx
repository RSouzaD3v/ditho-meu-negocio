'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DeleteDocumentBtn } from './_components/DeleteDocumentBtn';
import { FileText } from 'lucide-react';

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
    <div className="space-y-8 max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          Documentos do Negócio
        </h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Link href={`/dashboard/negocios/${id}/documentos/novo`}>
            + Novo Documento
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <p className="text-muted-foreground animate-pulse">Carregando...</p>
        </div>
      ) : documentos.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm text-center">
            Nenhum documento associado ainda.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {documentos.map((doc) => (
            <li
              key={doc.id}
              className="border rounded-lg p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-lg">{doc.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {doc.fileUrl && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline hover:text-blue-800"
                      >
                        Ver Arquivo
                      </a>
                    )}
                    <DeleteDocumentBtn id={doc.id} />
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(doc.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
