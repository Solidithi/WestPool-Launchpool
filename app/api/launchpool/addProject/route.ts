import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProjectStatus } from "@prisma/client";

import prismaClient from "@/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  const {
    projectName,
    tokenSymbol,
    verifiedToken,
    projectLogo,
    projectImage,
    shortDescription,
    longDescription,
    acceptedVToken,
    minStake,
    maxStake,
    fromDate,
    toDate,
    // projectStatus,
    chain,
    poolBudget,
    targetStake,
    projectOwnerAddress,
  } = body;

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
    let user = await prismaClient.user.findFirst({
      where: {
        userAddress:
          projectOwnerAddress,
      },
    });

    if (user === null) {
      user = await prismaClient.user.create({
        data: {
          userAddress: projectOwnerAddress,
        },
      });

    }

    let projectOwner = await prismaClient.projectOwner.findFirst({
      where: {
        userAddress:
          projectOwnerAddress,
      },
    });

    if (projectOwner === null) {
      projectOwner = await prismaClient.projectOwner.create({
        data: {
          userAddress: projectOwnerAddress,
        },
      });
    }

    const isProjectExisted = await prismaClient.project.findFirst({
      where: {
        verifiedTokenAddress: verifiedToken,
      },
    });

    if (isProjectExisted) {
      return NextResponse.json(
        { success: false, message: "Project already exists" },
        { status: 400 }
      );
    }

    const project = await prismaClient.project.create({
      data: {
        // projectName: "Test Project",
        // projectOwnerAddress: "0x123456",
        // verifiedTokenAddress: "0x",
        // projectLogo: "https://via.placeholder.com/150",
        // projectImage: ["https://via.placeholder.com/150"],
        // shortDescription: "This is a test project",
        // longDescription: "This is a test project",
        // acceptedVToken: ["Moonbeam", "Ethereum"],
        // minStake: 100,
        // maxStake: 1000,
        // fromDate: new Date(),
        // toDate: new Date(),
        // txHashCreated: "", // Add appropriate value
        // projectStatus: ProjectStatus.Upcoming, // Add appropriate value
        // chainName: "Ethereum", // Add appropriate value
        // poolBudget: 100000, // Add appropriate value
        // targetStake: 50000, // Add appropriate value

        projectName: projectName,
        tokenSymbol: tokenSymbol,
        projectOwnerAddress: projectOwnerAddress,
        verifiedTokenAddress: verifiedToken,
        projectLogo: projectLogo,
        projectImage: projectImage,
        shortDescription: shortDescription,
        longDescription: longDescription,
        acceptedVToken: acceptedVToken,
        minStake: minStake,
        maxStake: maxStake,
        fromDate: new Date(),
        toDate: new Date(),
        txHashCreated: "0xsgrgrg2234", // Add appropriate value
        projectStatus: ProjectStatus.Upcoming, // Add appropriate value
        chainName: chain, // Add appropriate value
        poolBudget: poolBudget, // Add appropriate value
        targetStake: targetStake, // Add appropriate value
        userId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "failed to create new project" },
        { status: 500 }
      );
    }

    console.log(project);
    //update launchpool number of project
    // const launchPoolData = await prismaClient.launchPool.findMany({});
    const launchPool = await prismaClient.launchPool.findFirst();

    if (!launchPool) {
      // Create a new LaunchPool record if none exists
      await prismaClient.launchPool.create({
        data: { totalProject: 1, uniqueParticipants: 0, totalTx: 0 },
      });
    } else {
      // Update the existing LaunchPool record
      await prismaClient.launchPool.update({
        where: { id: launchPool.id },
        data: {
          totalProject: { increment: 1 },
        },
      });
    }



    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
