"use client";
import { availableTokens } from "@/app/constants";
import { Offer, OfferType } from "@/app/interface/interface";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAddress, useChain } from "@thirdweb-dev/react";
import { chainConfig } from "@/app/config";
import { PoolFactoryABI, PoolABI } from "@/app/abi";
import { ethers } from "ethers";


const TokenOffer = () => {
  const [projectDetails, setProjectDetails] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [factoryAddress, setFactoryAddress] = useState<string | undefined>(
    undefined
  );
  const [factoryContract, setFactoryContract] = useState<ethers.Contract | null>(null);
  const pageParam = useParams();
  const userAddress = useAddress();


  const currentChain = useChain();


  useEffect(() => {
    if (!currentChain) {
      return;
    }

    const address: string =
      chainConfig[currentChain.chainId.toString() as keyof typeof chainConfig]
        ?.contracts?.PoolFactory?.address;

    setFactoryAddress(address);
    console.log("address", address);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      address,
      PoolFactoryABI,
      provider
    );
    setFactoryContract(factoryContract);
  }, [currentChain]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { projectId } = pageParam;
        console.log("Project id: " + projectId);

        const res = await axios.post("/api/preMarket/tokenOffer", { projectId });
        console.log("Respnse data: " + res.data);
        const data = res.data;

        if (data.success) {
          setProjectDetails(data.data);
          console.log("Project details: ", projectDetails);

        } else {
          console.error("Failed to fetch projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [pageParam]);

  const handleOffer = async (projectId: string, offerId: string, dialogId: string) => {
    try {
      const response = await axios.post("/api/preMarket/trade", {
        userAddress,
        projectId,
        offerId,
      });

      console.log(useAddress);


      const data = response.data;

      if (data.success) {
        console.log("Offer successfully updated!");
        alert("Successfully !");
        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
        if (dialog) {
          dialog.close(); // Đóng popup
        }
      } else {
        console.error("Failed to update offer:", data.error);
        alert("Could not update the offer. Please try again.");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };




  if (loading) return <div className="flex justify-center items-center h-[80vh]">
    <span className="loading loading-dots loading-lg "></span>
  </div>;


  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10 ">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[67px] leading-[60px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Pre-market
        </h1>
        <p className="text-[#A7B7DB]">Your Early Update on Financial Markets</p>
      </div>

      {/* -------------------------Title----------------------------- */}
      <div
        className="flex w-full items-center justify-between bg-[#3A66A9] rounded-xl h-auto gap-10 px-10 py-5 
      sm:grid sm:grid-rows-2 sm:grid-flow-col sm:gap-4 md:grid md:grid-rows-2 md:grid-flow-col md:gap-4 lg:flex lg:flex-row xl:flex xl:flex-row"
      >
        {/* {projectDetails.map((project) => ()} */}
        <div className="flex items-center gap-4 justify-center">
          <Image
            src={projectDetails[0]?.project.projectLogo}
            width={50}
            height={50}
            alt="icon"
            className="rounded-full"
          />
          <div className="flex flex-col text-left gap-1">
            <span className="text-[17px] font-bold">{projectDetails[0]?.project.projectName}</span>
            <span className="text-[12px] font-light text-[#DDDDDD]">
              {projectDetails[0]?.project.shortDescription}</span>
          </div>
        </div>

        {/* <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">24h vol</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">
            $10000 + 3%
          </span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">total Voll</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">$10000</span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">Settle start</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">TBA</span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">Settle endl</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">TBA</span>
        </div> */}
      </div>

      <div className="w-full flex flex-row gap-4">
        {/* ----------------------------Table 1--------------------------------- */}
        <div className="w-full rounded-xl bg-[#3A66A9] ">
          <table className="table">
            <thead>
              <tr className="text-[#DDDDDD] text-left text-[13px] border-b-[#E0E0E0]">
                <th className="py-7 pl-7 font-light">Price</th>
                <th className="font-light">Amount</th>
                <th className="font-light">Collateral</th>
                <th className="font-light">Fill type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.filter((data) => data.offerType === OfferType.Sell).map((project) => (
                <>
                  <tr className="text-white border-none">
                    <td className="pl-6 text-[#07F907]">{project.pricePerToken.toString()}</td>
                    <td>{project.amount.toString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{project.collateral.toString()}</span>
                        <Image
                          src={
                            availableTokens.find(token => token.address === project.tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                          }
                          alt="logo"
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                        FULL
                      </div>
                    </td>
                    <td>
                      <button
                        className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                        onClick={() =>
                          (
                            document.getElementById(`buy-${project.id}`) as HTMLDialogElement
                          ).showModal()
                        }
                      >
                        Buy
                      </button>
                      <dialog id={`buy-${project.id}`} className="modal">
                        <div className="modal-box bg-[#2D468D]">
                          <h3 className="font-bold text-lg mb-4 text-white">
                            {project.project.projectName}/{availableTokens.find(token => token.address === project.tokenCollateralAddress)?.name || ''}
                          </h3>

                          <div className="bg-[#5A78B8] rounded-lg p-4 mb-4 relative">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-green-400 font-bold text-sm">
                                BUYING
                              </span>
                              <span className="text-white text-xs">
                                MAX {project.amount.toString()} {project.project.projectName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <input
                                className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                                placeholder="enter"
                                value={project.amount.toString()}
                                readOnly
                              />
                              <Image
                                src={project.project.projectLogo}
                                alt="logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="bg-[#5A78B8] rounded-lg p-4 relative">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-200 font-bold text-sm">
                                COLLATERAL
                              </span>
                              <span className="text-white text-xs">
                                Balance: 0.001 {availableTokens.find(token => token.address === project.tokenCollateralAddress)?.name || ''}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <input
                                className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none
                                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                                placeholder="enter"
                                type="number"
                              />
                              <Image
                                src={availableTokens.find(token => token.address === project.tokenCollateralAddress)?.image || ''}
                                alt="logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleOffer(project.project.id, project.id, `buy-${project.id}`)}
                            className="btn bg-white text-[#7BA9EF] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#2C3E6F]">
                            Buy
                          </button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </td>
                  </tr>
                </>
              ))}


            </tbody>
          </table>
        </div>

        {/* ----------------------------Table w--------------------------------- */}
        <div className="w-full rounded-xl bg-[#3A66A9] ">
          <table className="table">
            <thead>
              <tr className="text-[#DDDDDD] text-left text-[13px] border-b-[#E0E0E0]">
                <th className="py-7 pl-7 font-light">Price</th>
                <th className="font-light">Amount</th>
                <th className="font-light">Collateral</th>
                <th className="font-light">Fill type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.filter((data) => data.offerType === OfferType.Buy).map((project) => (
                <>
                  <tr className="text-white border-none">
                    <td className="pl-6 text-[#07F907]">{project.pricePerToken.toString()}</td>
                    <td>{project.amount.toString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{project.collateral.toString()}</span>
                        <Image
                          src={
                            availableTokens.find(token => token.address === project.tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                          }
                          alt="logo"
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                    </td>
                    <td>
                      {/* <div className="border border-[#B8B8B8] text-[#B8B8B8] rounded-2xl px-2  text-[10px] flex justify-center w-2/3">
                    PARTIAL
                  </div> */}
                      <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                        FULL
                      </div>
                    </td>
                    <td>
                      <button
                        className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                        onClick={() =>
                          (
                            document.getElementById(`sell-${project.id}`) as HTMLDialogElement
                          ).showModal()
                        }
                      >
                        SELL
                      </button>
                      <dialog id={`sell-${project.id}`} className="modal">
                        <div className="modal-box bg-[#2D468D]">
                          <h3 className="font-bold text-lg mb-4 text-white">
                            {project.project.projectName}/{availableTokens.find(token => token.address === project.tokenCollateralAddress)?.name || ''}
                          </h3>

                          <div className="bg-[#5A78B8] rounded-lg p-4 mb-4 relative">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#ff2323] font-bold text-sm">
                                SELLING
                              </span>
                              <span className="text-white text-xs">
                                MAX {project.amount.toString()} {project.project.projectName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <input
                                className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                                placeholder="enter"
                                value={project.amount.toString()}
                                readOnly
                              />
                              <Image
                                src={project.project.projectLogo}
                                alt="logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="bg-[#5A78B8] rounded-lg p-4 relative">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-200 font-bold text-sm">
                                COLLATERAL
                              </span>
                              <span className="text-white text-xs">
                                Balance: 0.001 {availableTokens.find(token => token.address === project.tokenCollateralAddress)?.name || ''}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <input
                                className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none
                                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                                placeholder="enter"
                                type="number"
                              />
                              <Image
                                src={availableTokens.find(token => token.address === project.tokenCollateralAddress)?.image || ''}
                                alt="logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleOffer(project.project.id, project.id, `sell-${project.id}`)}
                            className="btn bg-white text-[#e86c6c] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#2a1919]">
                            Sell
                          </button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </td>
                  </tr>
                </>
              ))}



            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenOffer;
