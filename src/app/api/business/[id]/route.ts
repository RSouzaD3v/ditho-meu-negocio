import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const business = await db.business.findUnique({
    where: { id: params.id },
  });

  if (!business) {
    return NextResponse.json({ error: 'Negócio não encontrado' }, { status: 404 });
  }

  return NextResponse.json(business);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const updated = await db.business.update({
      where: { id: params.id },
      data: {
        name: body.name,
        cnpj: body.cnpj,
        niche: body.niche,
        description: body.description,
        phoneNumber: body.phoneNumber,
        email: body.email,
        website: body.website,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PUT /api/business/:id]', err);
    return NextResponse.json(
      { error: 'Erro ao atualizar negócio' },
      { status: 500 }
    );
  }
}
