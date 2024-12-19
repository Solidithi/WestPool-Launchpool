"use client";

import Image from "next/image";

const MyProjectPage = () => {
    return (
        <div>
            <div className="mt-20">
                {/* Ended Launchpool */}
                <div className="flex flex-col">
                    <div className="ml-32 mb-10 text-3xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                        Ended Launchpool
                    </div>

                    {/* Project Collapse component */}
                    <div className="flex flex-col justify-center items-center">

                        <div className="bg-base-200 collapse w-10/12">
                            <input type="checkbox" className="peer" />

                            <div
                                className="collapse-title bg-[#3D69AC] text-primary-content peer-checked:bg-[#3D69AC] peer-checked:text-secondary-content flex items-center"
                            >
                                <Image
                                    className="rounded-full bg-gray-500"
                                    src="/logo.svg" alt="logo" width={50} height={50} />
                                <div className="flex flex-col ml-5">
                                    <span className=" text-lg">Project Name</span>
                                    <span className="text-sm">Short Description</span>
                                </div>
                            </div>

                            <div
                                className="collapse-content bg-blue-500 text-primary-content peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
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
                        </div> {/* End of Project Collapse component */}

                        {/*@dev: Testing and need delete */}
                        <div className="bg-base-200 collapse w-10/12">
                            <input type="checkbox" className="peer" />

                            <div
                                className="collapse-title bg-[#3D69AC] text-primary-content peer-checked:bg-[#3D69AC] peer-checked:text-secondary-content flex items-center"
                            >
                                <Image
                                    className="rounded-full bg-gray-500"
                                    src="/logo.svg" alt="logo" width={50} height={50} />
                                <div className="flex flex-col ml-5">
                                    <span className=" text-lg">Project Name</span>
                                    <span className="text-sm">Short Description</span>
                                </div>
                            </div>

                            <div
                                className="collapse-content bg-blue-500 text-primary-content peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
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


                    </div>
                </div>


                {/* Pending Launchpool */}
                <div className="mt-20">
                    <div className="ml-32 mb-10 text-3xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                        Pending Launchpool
                    </div>
                    <div className="flex justify-center items-center">

                        <div className="bg-base-200 collapse w-10/12">
                            <input type="checkbox" className="peer" />

                            <div
                                className="collapse-title bg-[#3D69AC] text-primary-content peer-checked:bg-[#3D69AC] peer-checked:text-secondary-content flex items-center"
                            >
                                <Image
                                    className="rounded-full bg-gray-500"
                                    src="/logo.svg" alt="logo" width={50} height={50} />
                                <div className="flex flex-col ml-5">
                                    <span className=" text-lg">Project Name</span>
                                    <span className="text-sm">Short Description</span>
                                </div>
                            </div>

                            <div
                                className="collapse-content bg-blue-500 text-primary-content peer-checked:bg-[#628FD4] peer-checked:text-secondary-content
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
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProjectPage;
