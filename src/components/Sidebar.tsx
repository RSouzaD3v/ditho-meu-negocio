'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Building, FileText, Settings } from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { href: '/dashboard/negocios', label: 'Negócios', icon: <Building className="w-4 h-4" /> },
    { href: '/dashboard/documentos', label: 'Documentos', icon: <FileText className="w-4 h-4" /> },
    { href: '/dashboard/configuracoes', label: 'Configurações', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="md:w-64 w-11 py-2 min-h-screen bg-white border-r md:px-4 md:py-6">
      <div>
        <h2 className="text-xl font-bold mb-8 px-2 hidden md:block">Ditho MS</h2>
        <h2 className="text-xl font-bold mb-8 px-2 md:hidden block">D</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-all',
              pathname === link.href ? 'bg-muted font-medium' : 'text-muted-foreground'
            )}
          >
            {link.icon}
            <span className='md:block hidden'>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
