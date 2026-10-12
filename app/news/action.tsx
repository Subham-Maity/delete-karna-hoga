"use server"

import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export async function createNews(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
        return { success: false, message: "Title and Description required." };
    }

    try {
        const newNews = await prisma.news.create({
            data: {
                title: title,
                description: description
            }
        })

        return {
            success: true,
            newNews: { title: newNews.title, description: newNews.description }
        }
    } catch (error) {
        return {
            success: false,
            message: "Unexpected error occurred during creating."
        }
    }
}

export async function getNews(query: string = "") {
    try {
        const trimmed = query.trim();

        const news = await prisma.news.findMany({
            where: trimmed ? {
                OR: [
                    { title: { contains: trimmed, mode: "insensitive" } }
                ],
            }
                : undefined,
            orderBy: {
                id: "desc",
            },
        });

        return { success: true, data: news };

    } catch (error) {
        console.error("Error fetching news : ", error);
        return { success: false, data: [] };
    }
}

export async function getNewsById(id: string) {
    try {
        const news = await prisma.news.findUnique({
            where : {
                id
            }
        });

        if(!news) {
            return { success : false, data : null };
        }

        return { success : true, data : news };
    } catch (error) {
        console.error("Error fetching news : ",error);
        return { success : false, data : null }
    }
}