'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function EditarNegocioPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    cnpj: '',
    niche: '',
    description: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/business/${id}`);
      if (!res.ok) {
        router.push('/dashboard/negocios');
        return;
      }
      const data = await res.json();
      setForm({ ...form, ...data });
      setLoading(false);
    }

    if (id) fetchData();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const res = await fetch(`/api/business/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || 'Erro ao atualizar negócio');
      return;
    }

    router.push(`/dashboard/negocios/${id}`);
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Editar Negócio</h1>
        <p className="text-muted-foreground text-sm">Atualize os dados do negócio.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nome</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>CNPJ</Label>
            <Input name="cnpj" value={form.cnpj} onChange={handleChange} />
          </div>
          <div>
            <Label>Nicho</Label>
            <Input name="niche" value={form.niche} onChange={handleChange} />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Website</Label>
            <Input name="website" value={form.website} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <Label>Descrição</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <Label>Cidade</Label>
            <Input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Label>Estado</Label>
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>
          <div>
            <Label>CEP</Label>
            <Input name="zipCode" value={form.zipCode} onChange={handleChange} />
          </div>
          <div>
            <Label>País</Label>
            <Input name="country" value={form.country} onChange={handleChange} />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={saving} className="w-full mt-4">
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </div>
  );
}
