"use server"

import { prisma } from "@/app/lib/prisma";

type UpdateNews = {
  title?: string;
  description?: string;
};

export async function updateNews(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    const updateNews = await prisma.news.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    return { success: true, data: updateNews };
  } catch (error) {
    return { success: false, message: "Failed to updated" };
  }
}