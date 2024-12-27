import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
    // const body = await req.json();
    // console.log(body);
    // const {
    //     projectName,
    //     verifiedToken,
    //     projectLogo,
    //     projectImage,
    //     shortDescription,
    //     longDescription,
    //     acceptedVToken,
    //     minStake,
    //     maxStake,
    //     fromDate,
    //     toDate,
    //     projectStatus
    // } = body;

    try {
        // const project = await prismaClient.project.create({
        //     data: {
        //         projectName: projectName as string,
        //         projectOwnerAddress: "0x",
        //         verifiedToken: verifiedToken as string,
        //         projectLogo: projectLogo as string,
        //         projectImage: projectImage as string[],
        //         shortDescription: shortDescription as string,
        //         longDescription: longDescription as string,
        //         acceptedVToken: acceptedVToken as number,
        //         minStake: minStake as number,
        //         maxStake: maxStake as number,
        //         fromDate: fromDate as Date,
        //         toDate: toDate as Date,
        //         txHashCreated: "", // Add appropriate value
        //         projectStatus: projectStatus, // Add appropriate value
        //     },
        // })
        //insert some random data to test
        const project = await prismaClient.project.create({
            data: {
                projectName: "Test Project",
                projectOwnerAddress: "0x",
                verifiedToken: "0x",
                projectLogo: "https://via.placeholder.com/150",
                projectImage: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
                shortDescription: "Short Description",
                longDescription: "Long Description",
                acceptedVToken: 1,
                minStake: 1,
                maxStake: 100,
                fromDate: new Date(),
                toDate: new Date(),
                txHashCreated: "", // Add appropriate value
                projectStatus: "PENDING", // Add appropriate value
            },
        })

        if(!project) {
            return NextResponse.json({ success: false, message: "failed to create new project" }, { status: 500 });
        }

        console.log(project);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });

    }


}

