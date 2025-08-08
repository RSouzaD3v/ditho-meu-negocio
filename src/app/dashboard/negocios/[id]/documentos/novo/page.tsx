'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NovoDocumentoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch(`/api/business/${id}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, fileUrl }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Erro ao criar documento');
      return;
    }

    router.push(`/dashboard/negocios/${id}/documentos`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-lg p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900">Novo Documento</h1>
          <p className="text-muted-foreground text-base">
            Cadastre um novo documento para este negócio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold text-gray-700">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="focus:ring-2 focus:ring-primary"
              placeholder="Digite o título do documento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl" className="font-semibold text-gray-700">
              Link do Arquivo <span className="text-gray-400">(opcional)</span>
            </Label>
            <Input
              id="fileUrl"
              name="fileUrl"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://exemplo.com/documento.pdf"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="rounded bg-red-100 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 font-semibold text-base"
          >
            {loading ? 'Salvando...' : 'Salvar Documento'}
          </Button>
        </form>
      </div>
    </div>
  );
}
