'use client';

import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';

export default function ConfiguracoesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Chamar API para atualizar perfil
    console.log('Atualizando perfil:', { name, email });
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-muted py-10">
      <Card className="w-full max-w-xl shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Configurações</CardTitle>
          <CardDescription>
            Gerencie suas informações de perfil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-medium">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder="Seu nome"
                autoComplete="name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="mt-1 opacity-80 cursor-not-allowed"
                autoComplete="email"
              />
            </div>

            <Button type="submit" className="w-full text-base font-semibold">
              Salvar alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
