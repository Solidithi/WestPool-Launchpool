"use client";

import Image from "next/image";
import { dataTable } from "../../constants/index";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { ProjectStatus } from "@prisma/client";
import { debounce } from "@/app/utils/helper";

const MyProjectPage = () => {
  // const [projects, setProjects] = useState<any[]>([]);
  const [pendingProjects, setPendingProjects] = useState<any[]>([]);
  const [endedProjects, setEndedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");


  const projectOwnerAddress = useAddress();


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
        
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].projectStatus === "Upcoming") {
            console.log("Pending Projects: " + projects[i]);
            console.log("Pending Projects: " + projects[i].projectName);
            pending.push(projects[i]);
          } else {
            ended.push(projects[i]);
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
    
    const fetchProjectWithDebounce = debounce( fetchMyProjects, 1000);
    useEffect(() => {
      fetchProjectWithDebounce();
  }, [projectOwnerAddress]);






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
              {endedProjects
                .filter((data) => data.endsIn === "--")
                .map((data) => (
                  <div
                    key={data.title}
                    className="bg-base-200 collapse w-10/12 border-2 border-[#A1C6FF] transition duration-500 ease-in-out transform hover:scale-105"
                  >
                    <input type="checkbox" className="peer" />

                    <div className="collapse-title bg-gradient-to-r from-[#204275] to-[#4D75B3] text-white peer-checked:bg-[#3D69AC] peer-checked:text-white flex items-center">
                      <Image
                        className="rounded-full bg-gray-500"
                        src={data.image}
                        alt="logo"
                        width={50}
                        height={50}
                      />
                      <div className="flex flex-col ml-5">
                        <span className=" text-lg">{data.title}</span>
                        <span className="text-sm">
                          {data.short_description}
                        </span>
                      </div>
                    </div>

                    <div
                      className="collapse-content bg-blue-500 text-white peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
                                     border border-b rounded-b-2xl"
                    >
                      <div className="flex items-center">
                        <div className="">
                          <p className="">hello</p>
                        </div>
                        <div className="ml-auto mb-4 mr-5   ">
                          <button
                            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mt-4 rounded-2xl"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent collapse toggle
                              console.log("Button clicked!");
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
              {pendingProjects
                .filter((data) => data.endsIn !== "--")
                .map((data) => (
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
                          <p className="">{data.longDescription}</p>
                        </div>
                        <div className="ml-auto mb-4 mr-5   ">
                          <button
                            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mt-4 rounded-2xl"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent collapse toggle
                              console.log("Button clicked!");
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
