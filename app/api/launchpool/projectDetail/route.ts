import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const projectId = body;
    const launchpoolData = await prismaClient.project.findMany({
      where: { id: projectId },
    });

    return NextResponse.json(
      { success: true, data: launchpoolData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
