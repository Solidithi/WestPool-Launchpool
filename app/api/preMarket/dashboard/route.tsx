import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { userId } = body;

        const preMarketData = await prismaClient.offer.findMany({
            where: {
                users: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                project: true,
                users: true,
            },
        });

        return NextResponse.json(
            { success: true, data: preMarketData },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 400 });
    }
}
