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
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Novo Documento</h1>
        <p className="text-muted-foreground text-sm">Cadastre um novo documento para este negócio.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fileUrl">Link do Arquivo (opcional)</Label>
          <Input
            id="fileUrl"
            name="fileUrl"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="https://exemplo.com/documento.pdf"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Salvando...' : 'Salvar Documento'}
        </Button>
      </form>
    </div>
  );
}
