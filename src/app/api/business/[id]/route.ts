import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption';
import { db } from '@/lib/db';

// GET /api/business/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
    const { id } = await params;

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const business = await db.business.findUnique({
    where: { id: id },
  });

  if (!business) {
    return NextResponse.json({ error: 'Negócio não encontrado' }, { status: 404 });
  }

  return NextResponse.json(business);
}

// PUT /api/business/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const updated = await db.business.update({
      where: { id: id },
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

// DELETE /api/business/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    await db.business.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Negócio excluído com sucesso.' });
  } catch (err) {
    console.error('[DELETE /api/business/:id]', err);
    return NextResponse.json(
      { error: 'Erro ao excluir negócio' },
      { status: 500 }
    );
  }
}
