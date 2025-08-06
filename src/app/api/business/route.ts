import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption'; // ajuste para onde você define suas auth options
import { db } from '@/lib/db'; // ajuste conforme o seu caminho do Prisma Client

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const business = await db.business.create({
      data: {
        name: body.name,
        cnpj: body.cnpj,
        niche: body.niche,
        description: body.description,
        logoUrl: null,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        phoneNumber: body.phoneNumber,
        email: body.email,
        website: body.website,
        ownerId: user.id,
      },
    });

    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('[POST /api/business]', error);
    return NextResponse.json(
      { error: 'Erro ao criar negócio' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      businesses: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json(user.businesses);
}

