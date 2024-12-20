"use client";

import Image from "next/image";
import { dataTable } from "../constants/index";

const MyStakingPage = () => {
  return (
    <div>
      <div className="py-10">
        {/* Ended Launchpool */}
        <div className="flex flex-col">
          <div className="ml-32 mb-10 text-3xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent ">
            Ended Launchpool
          </div>

          {/* Project Collapse component */}
          <div className="flex flex-col justify-center items-center gap-5 ">
            <>
              {dataTable
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
            Pending Launchpool
          </div>
          <div className="flex flex-col justify-center items-center gap-5 ">
            <>
              {dataTable
                .filter((data) => data.endsIn !== "--")
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
      </div>
    </div>
  );
};

export default MyStakingPage;
