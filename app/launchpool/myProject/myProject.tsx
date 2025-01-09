"use client";

import Image from "next/image";
import { dataTable } from "../../constants/index";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useAddress, useChain } from "@thirdweb-dev/react";
import { ProjectStatus } from "@prisma/client";
import { debounce } from "@/app/utils/helper";
import { ethers } from "ethers";
import { chainConfig } from "@/app/config";
import { PoolABI, PoolFactoryABI } from "@/app/abi";
import { Project } from "@/app/interface/interface";

// projectOwnerClaiming, getProjectOwnerReward

const MyProjectPage = () => {
  // const [projects, setProjects] = useState<any[]>([]);
  const [pendingProjects, setPendingProjects] = useState<any[]>([]);
  const [endedProjects, setEndedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [factoryAddress, setFactoryAddress] = useState<string | undefined>(
    undefined
  );

  const [factoryContract, setFactoryContract] = useState<ethers.Contract | null>(null);
  const projectOwnerAddress = useAddress();
  const [isCallingContract, setIsCallingContract] = useState<boolean>(false);


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

  const fetchMyProjects = async () => {
    try {
      const response = await axios.post("/api/launchpool/myProject", {
        projectOwnerAddress,
      });
      console.log("This : " + response.data);
      if (!response.data.success) {
        console.log(response.data.message);
        return;
      }

      const projects = response.data.projects;
      const pending = [];
      const ended = [];

      const provider = new ethers.providers.Web3Provider(window.ethereum);


      for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        console.log("Project: " + project);

        const poolAddress = await factoryContract!.getPoolAddress(
          project.id
        );
        console.log("Pool Address: " + poolAddress);

        const contract = new ethers.Contract(
          poolAddress,
          PoolABI,
          provider
        );

        const poReward = await contract.getProjectOwnerReward();

        if (project.projectStatus === "Upcoming" || project.projectStatus === "Ongoing") {
          console.log("Pending Projects: " + projects[i]);
          console.log("Pending Projects: " + projects[i].projectName);
          // pending.push(projects[i]);
          pending.push(
            Object.assign(project, {
              poReward
            })
          );
        } else {
          // ended.push(projects[i]);
          ended.push(
            Object.assign(project, {
              poReward
            })
          );
        }
      }

      // Set state after loop
      setPendingProjects(pending);
      setEndedProjects(ended);
      console.log("Pending Projects: " + pendingProjects);
      console.log("Pending Projects: " + pendingProjects[0].projectName);
      console.log("Ended Projects: " + endedProjects[0].projectName);
      for (let project in pendingProjects) {
        console.log("Pending Projects: " + project);
      }


    } catch (error) {
      console.log(error);
    }
  }

  const fetchProjectWithDebounce = debounce(fetchMyProjects, 1000);
  useEffect(() => {
    fetchProjectWithDebounce();
  }, [projectOwnerAddress, fetchProjectWithDebounce]);





  const handleWithdraw = async (project: Project) => {
    console.log("Withdrawing rewards for project:", project);

    setIsCallingContract(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("Provider", provider);
      console.log("Signer", signer);

      const poolAddr = await factoryContract?.getPoolAddress(project.id);
      console.log("Pool address fetched:", poolAddr);

      const poolContract = new ethers.Contract(poolAddr, PoolABI, signer);
      console.log("Pool contract initialized:", poolContract);

      const resp = await poolContract.projectOwnerClaiming();
      console.log("Transaction response:", resp);

      // Show success message
      alert("Withdrawal successful!");

    } catch (error: any) {
      console.error("Error during withdrawal:", error);

      const errorMessage = error?.data?.message || error?.message || "";

      if (errorMessage.includes("Project is still ongoing")) {
        alert(
          "Unable to withdraw: The project is still ongoing. Please try again after the project ends."
        );
      } else if (errorMessage.includes("No rewards available for project owner")) {
        alert(
          "Unable to withdraw: No rewards are currently available for the project owner."
        );
      } else if (errorMessage.includes("ERC20: transfer amount exceeds balance")) {
        alert(
          "Unable to withdraw: The contract does not have enough tokens to complete the transaction."
        );
      }
      else {
        alert("An error occurred during the withdrawal process.");
      }
    } finally {
      setIsCallingContract(false);
    }
  };






  return (
    <div>
      <div className="py-10">
        {/* Ended Launchpool */}
        <div className="flex flex-col">
          <div className="ml-32 mb-10 text-3xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
            Ended Pool
          </div>

          {/* Project Collapse component */}
          <div className="flex flex-col justify-center items-center gap-5">
            <>
              {endedProjects.map((data) => (
                <div
                  key={data.id}
                  className="bg-base-200 collapse w-10/12 border-2 border-[#A1C6FF] transition duration-500 ease-in-out transform hover:scale-105"
                >
                  <input type="checkbox" className="peer" />

                  <div className="collapse-title bg-gradient-to-r from-[#204275] to-[#4D75B3] text-white peer-checked:bg-[#3D69AC] peer-checked:text-white flex items-center">
                    <Image
                      className="rounded-full bg-gray-500"
                      src={data.projectLogo}
                      alt="logo"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col ml-5">
                      <span className=" text-lg">{data.projectName}</span>
                      <span className="text-sm">
                        {data.shortDescription}
                      </span>
                    </div>
                  </div>

                  <div
                    className="collapse-content bg-blue-500 text-white peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
                                     border border-b rounded-b-2xl"
                  >
                    <div className="flex items-center">
                      <div className="">
                        <p className="">{data.poReward.toString()}</p>
                      </div>
                      <div className="ml-auto mb-4 mr-5   ">
                        <button
                          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mt-4 rounded-2xl"
                          onClick={(e) => {
                            handleWithdraw(data);
                          }}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>

        {/* Pending Launchpool */}
        <div className="mt-20">
          <div className="ml-32 mb-10 text-3xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
            Pending Pool
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <>
              {pendingProjects.map((data) => (
                <div
                  key={data.id}
                  className="bg-base-200 collapse w-10/12 border-2 border-[#A1C6FF] transition duration-500 ease-in-out transform hover:scale-105"
                >
                  <input type="checkbox" className="peer" />

                  <div className="collapse-title bg-gradient-to-r from-[#204275] to-[#4D75B3] text-white peer-checked:bg-[#3D69AC] peer-checked:text-white flex items-center">
                    <Image
                      className="rounded-full bg-gray-500"
                      src={data.projectLogo}
                      alt="logo"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col ml-5">
                      <span className=" text-lg">{data.projectName}</span>
                      <span className="text-sm">
                        {data.shortDescription}
                      </span>
                    </div>
                  </div>

                  <div
                    className="collapse-content bg-blue-500 text-white peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
                                     border border-b rounded-b-2xl"
                  >
                    <div className="flex items-center">
                      <div className="">
                        <p className="">{data.poReward.toString()}</p>
                      </div>
                      <div className="ml-auto mb-4 mr-5   ">
                        <button
                          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mt-4 rounded-2xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWithdraw(data);
                          }}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectPage;
