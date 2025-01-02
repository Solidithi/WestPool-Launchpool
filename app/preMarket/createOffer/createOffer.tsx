"use client";
import { useRouter } from "next/navigation";
import CustomDropdown from "../../components/Dropdown";
import SidePick from "../../components/SidePick";
import { availableNetworks, availableTokens } from "../../constants";
import { useCombinedStore, useCreateOfferStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { TokenData } from "@/app/interface/interface";
import { id } from "ethers/lib/utils";

const CreateOfferPage = () => {
  const {
    tokenAddress,
    role,
    pricePerToken,
    amount,
    selectedNetwork,
    selectedToken,
    collateral,
    selectedCollateralToken,
    setTokenAddress,
    setRole,
    setPricePerToken,
    setAmount,
    setSelectedNetwork,
    setSelectedToken,
    setCollateral,
    setSelectedCollateralToken,
  } = useCombinedStore();

  const [ projectTokens, setProjectTokens ] = useState<TokenData[]>([]);
  const router = useRouter();

  const handleDeposit = () => {
    //Condition to check every field is filled
    console.log(tokenAddress, pricePerToken, amount, selectedNetwork, selectedToken, collateral, selectedCollateralToken);

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

    router.push("/preMarket/createOffer/preview");
  };

  // const handleCollateral = () => {
  //   if (!pricePerToken || !amount) {
  //     // Set collateral to a placeholder value (e.g., 0 or undefined)
  //     setCollateral(0);
  //   } else {
  //     // Calculate and set the collateral
  //     setCollateral(pricePerToken * amount);
  //   }
  // };

  // useEffect(() => {
  //   handleCollateral();
  // }, [amount, pricePerToken]);

  useEffect(() => {
    if (!pricePerToken || !amount) {
      setCollateral(0);
    } else {
      setCollateral(pricePerToken * amount);
    }
  }, [pricePerToken, amount, setCollateral]);


  useEffect(() => {
    const fetchProjectTokens = async () => {
      const response = await axios.post("/api/preMarket/projectToken", {});

      if (!response.data.success) {
        console.log(response.data.message);
        return;
      }

      console.log(response.data);

      const projectTokens = response.data.projects;
      const tokens = projectTokens.map((project: any) => {
        return {
          id: project.id,
          name: project.projectName,
          symbol: project.tokenSymbol,
          image: project.projectLogo,
          address: project.verifiedTokenAddress,
        };
      });
      console.log("Tokens: ", tokens);  
      setProjectTokens(tokens);

      // for(let project in projectTokens){

      // }


      
    }
    fetchProjectTokens();
  }, []);



  return (
    <div>
      <div className="mt-10 text-5xl text-center font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
        Offer Settings
      </div>

      <div className="mt-14">
        <SidePick />
      </div>

      <div className="mt-10 flex justify-center">
        <div className="border box-border w-7/12 bg-[#3966a9] text-white rounded-2xl mb-10">
          <div className="flex flex-col">
            {/* Price per token */}
            <div className="mt-7 mx-16 border bg-[#5a88ce] rounded-xl">
              <div className="text-xl my-3 ml-10 font-semibold">
                PRICE PER TOKEN
              </div>

              <div className="ml-10 my-5 text-2xl text-white">
                <span className="mr-5">$ </span>
                <input
                  type="number"
                  placeholder="Enter your price"
                  className="bg-[#5a88ce] text-2xl border-none focus:outline-none
                  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                  onChange={(e) => setPricePerToken(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="mt-12 mx-16 border bg-[#5a88ce] rounded-xl">
              <div className="text-xl my-3 ml-10 font-semibold">AMOUNT</div>

              <div className="ml-10 my-5 flex flex-row gap-4 mr-5">
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="bg-[#5a88ce] text-2xl text-white border-none focus:outline-none pt-3 "
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                <div className="text-black w-full text-center">
                  <CustomDropdown
                    className="text-[#5a88ce]"
                    options={availableNetworks}
                    placeholder="Select Network"
                    state="selectedNetwork"
                  />
                </div>

                <div className="text-black w-full text-center">
                  <CustomDropdown
                    className="text-[#5a88ce]"
                    options={projectTokens}
                    placeholder="Select Token"
                    state="selectedToken"
                  />
                </div>
              </div>
            </div>

            {/* Collateral */}
            <div className="mt-7 mx-16 border bg-[#5a88ce] rounded-xl">
              <div className="text-xl my-3 ml-10 font-semibold">COLLATERAL</div>

              <div className="ml-10 my-5 flex flex-row gap-4">
                <div className="">
                  <input
                    type="number"
                    value={`${collateral}`}
                    className="bg-[#5a88ce] text-2xl text-white border-none focus:outline-none pt-3 read-only:text-white"
                    onChange={(e) => setCollateral(Number(e.target.value))}
                    readOnly
                  />
                </div>

                <div className="text-black w-full text-center grid grid-cols-2">
                  <div className=""></div>
                  <div className="mr-5">
                    <CustomDropdown
                      className="text-[#5a88ce]"
                      options={availableTokens}
                      placeholder="Select Token"
                      state="selectedCollateralToken"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              className="mt-7 mx-16 my-14 py-4 border text-[#5a88ce] bg-white rounded-3xl text-3xl text-center flex justify-center items-center"
              onClick={handleDeposit}
            >
              Deposit
            </div> */}
            <button
              className="btn mt-7 mx-16 my-14  text-3xl text-center h-16  bg-[#ffffff] hover:bg-[#2d4466] rounded-2xl text-[24px] text-[#7BA9EF]"
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

export default CreateOfferPage;
