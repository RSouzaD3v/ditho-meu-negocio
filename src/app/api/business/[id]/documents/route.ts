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

  const businessId = params.id;

  const docs = await db.document.findMany({
    where: { businessId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(docs);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const businessId = params.id;

  const document = await db.document.create({
    data: {
      title: body.title,
      fileUrl: body.fileUrl || null,
      businessId,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
