import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type UpdateNews = {
  title?: string;
  description?: string;
}

export async function PUT(request: NextRequest,{ params } : { params: Promise<{ id: string }>}) {
  const body: UpdateNews = await request.json();
  const { id } = await params;

  const updateNews = await prisma.news.update({
    where : {
      id,
    },
    data : {
      title: body.title,
      description : body.description
    }
  });

  return NextResponse.json(updateNews);
}