import { Wrench, Building, Settings, Stars } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/dashboard/ferramentas", label: "Ferramentas", icon: <Wrench className="w-5 h-5" /> },
  { href: "/dashboard/growth", label: "Crescimento", icon: <Stars className="w-5 h-5" /> },
  { href: "/dashboard/negocios", label: "Negócios", icon: <Building className="w-5 h-5" /> },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: <Settings className="w-5 h-5" /> },
];

export default function DashboardHome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Bem-vindo ao Ditho Meu Negócio</h1>
        <p className="text-muted-foreground mb-10 text-center">
          Aqui você pode visualizar seus negócios cadastrados, documentos importantes e gerenciar sua conta.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-6 text-center">Acessos Rápidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition"
              >
                <div className="mb-3 text-primary">{link.icon}</div>
                <span className="font-medium text-lg">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
