'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Message = {
  sender: 'user' | 'ai';
  message: string;
  hour: Date;
};

export default function GrowthPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll automático
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      message: input.trim(),
      hour: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agents/growth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.message }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        sender: 'ai',
        message: data.result,
        hour: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="my-5">
        <h1 className="text-3xl font-bold">Planejamento com a IA</h1>
        <p>Converse com a IA para planejar ações de crescimento no seu negócio.</p>
      </div>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle>Chat com a Ditho IA</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">Comece digitando sua meta ou pergunta.</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-muted text-gray-900 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                  <div className="mt-1 text-[10px] opacity-60 text-right">
                    {msg.hour.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </CardContent>

        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Digite sua meta, pergunta ou ideia..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? '...' : 'Enviar'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
