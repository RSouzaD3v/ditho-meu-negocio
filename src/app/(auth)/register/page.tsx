'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Erro ao criar usuário.');
    } else {
      setSuccess('Usuário criado com sucesso! Redirecionando...');
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => router.push('/login'), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Criar Conta</h1>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
