'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) return <div className="flex justify-center items-center h-96"><p className="text-lg text-muted-foreground">Carregando...</p></div>;

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-slate-50 to-slate-200 py-8">
      <Card className="w-full max-w-2xl shadow-lg border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-primary">Editar Negócio</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Atualize os dados do negócio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input name="name" id="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input name="cnpj" id="cnpj" value={form.cnpj} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="niche">Nicho</Label>
                <Input name="niche" id="niche" value={form.niche} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Telefone</Label>
                <Input name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input name="website" id="website" value={form.website} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea name="description" id="description" value={form.description} onChange={handleChange} rows={3} />
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input name="address" id="address" value={form.address} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input name="city" id="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input name="state" id="state" value={form.state} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input name="zipCode" id="zipCode" value={form.zipCode} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="country">País</Label>
                <Input name="country" id="country" value={form.country} onChange={handleChange} />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button
              type="submit"
              disabled={saving}
              className="w-full mt-2 py-6 text-lg font-semibold rounded-lg shadow transition-all duration-150"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
