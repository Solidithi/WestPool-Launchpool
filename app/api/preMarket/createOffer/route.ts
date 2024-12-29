import prismaClient from "@/prisma";
import { CreateOfferStatus, FillerOfferStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body);

    const {
        role,
        pricePerToken,
        amount,
        selectedNetwork,
        selectedToken,
        collateral,
        selectedCollateralToken,
        creatorAddress,
    } = body;

    try {
        const getProject = await prismaClient.project.findFirst({
            where: {
                verifiedTokenAddress: selectedToken,
            }
        });

        const projectId = getProject?.id;

        if (!projectId) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
        }


        // const createdDateTime = new Date().toISOString();
        // const creatorStatus = CreateOfferStatus.Open
        // const fillerStatus = FillerOfferStatus.NotYet
        const offer = await prismaClient.offer.create({
            data: {
                pricePerToken: pricePerToken,
                amount: amount,
                collateral: collateral,
                tokenImagePreToken: selectedToken,
                tokenImageCollateral: selectedCollateralToken,
                offerType: role,
                startDate: new Date().toISOString(),
                filledTime:"",
                creatorStatus: CreateOfferStatus.Open,
                fillerStatus: FillerOfferStatus.NotYet,
                creatorAddress: creatorAddress,
                fillerAddress: "",
                projectId: projectId,
            }            
        });

        return NextResponse.json({ success: true, offer: offer }, { status: 200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 })
    }
}