import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption';
import { db } from '@/lib/db';

// GET /api/business/[id]/documents
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const businessId = id;

  const docs = await db.document.findMany({
    where: { businessId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(docs);
}

// POST /api/business/[id]/documents
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const businessId = id;
  const body = await req.json();

  const document = await db.document.create({
    data: {
      title: body.title,
      fileUrl: body.fileUrl || null,
      businessId,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
