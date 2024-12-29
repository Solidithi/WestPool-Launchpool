"use client";
import { useCombinedStore } from "@/app/zustand/store";
import { OfferType } from "@prisma/client";
// import { OfferType } from "@/prisma/enum";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PreviewOfferPage = () => {
  const {
    role,
    pricePerToken,
    amount,
    selectedNetwork,
    selectedToken,
    collateral,
    selectedCollateralToken,
  } = useCombinedStore();

  const creatorAddress = useAddress();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDeposit = async () => {
    //Condition to check every field is filled
    if (
      !pricePerToken ||
      !amount ||
      !selectedNetwork ||
      !selectedToken ||
      !collateral ||
      !selectedCollateralToken
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post("/api/preMarket/createOffer", {
        pricePerToken,
        amount,
        collateral,
        selectedToken,
        selectedCollateralToken,
        role,
        creatorAddress,
        selectedNetwork,
      });
      console.log(response.data);

      if (response.data.success) {
        console.log(response.data);
      }



      router.push("/createOffer/preview");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-10 text-4xl text-center font-bold text-[#ffffff]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row space-x-2">
            <div className="">
              <span>Your offer was to</span>
            </div>

            <div>
              {role === OfferType.Buy ? (
                <div className="text-[#2ab84e]">
                  <span>
                    buy {amount} {selectedToken}
                  </span>
                </div>
              ) : (
                <div className="text-[#b10202]">
                  <span>
                    sell {amount} {selectedToken}
                  </span>
                </div>
              )}
            </div>

            <div className="">for</div>

            <div>
              {role === OfferType.Buy ? (
                <div className="text-[#2ab84e]">
                  <span>
                    {pricePerToken} {selectedToken}
                  </span>
                </div>
              ) : (
                <div className="text-[#b10202]">
                  <span>
                    {pricePerToken} {selectedToken}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row space-x-2">
            <div>in</div>
            <div className="font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
              Pre-market
            </div>
          </div>
        </div>
      </div>

      {/* Preview order */}
      <div className="mt-10 flex justify-center">
        <div className="border box-border w-5/12 bg-[#3966a9] text-white rounded-2xl text-2xl mb-10">
          <div className="grid grid-cols-2 ml-10 mt-14 mb-20">
            <div className="">
              <div className="space-y-16">
                <div className="">Offer Type</div>

                <div className="">Price</div>

                <div className="">Amount</div>

                <div className="">For</div>

                <div className="">Fill type</div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end mr-10 font-bold ">
              <div className="space-y-16">
                <div className="flex justify-end">
                  {role === OfferType.Buy ? (
                    <div className="text-[#2ab84e] ">WANT TO BUY</div>
                  ) : (
                    <div className="text-[#b10202] ">WANT TO SELL</div>
                  )}
                </div>

                <div className="flex justify-end">${pricePerToken}</div>

                <div className="flex justify-end">
                  {amount} {selectedToken}
                </div>

                <div className="flex justify-end">
                  {collateral} {selectedCollateralToken}
                </div>

                <div className="flex justify-end">Single Fill</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row space-x-3 justify-center items-center mb-8">
            <button
              className="btn w-5/12 bg-[#ffffff] hover:bg-[#2d4466] rounded-2xl text-[24px] text-[#7BA9EF]"
              onClick={handleBack}
            >
              Back
            </button>

            <button
              className="btn w-5/12 bg-[#ffffff] hover:bg-[#2d4466] rounded-2xl text-[24px] text-[#7BA9EF] "
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewOfferPage;
