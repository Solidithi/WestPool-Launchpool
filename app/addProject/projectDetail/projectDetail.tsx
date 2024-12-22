"use client";
import { useProjectDetailStore } from "@/app/zustand/store";
import { useRouter } from "next/navigation";
import { useState } from "react";



const ProjectDetailPage = () => {
    const {
        projectName,
        setProjectName,
        shortDescription,
        setShortDescription,
        longDescription,
        setLongDescription,
        maxStake,
        setMaxStake,
        minStake,
        setMinStake,
        acceptedVToken,
        setAcceptedVToken,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        projectImage,
        setProjectImage,
        projectLogo,
        setProjectLogo,
    } = useProjectDetailStore();

    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (value: File | null) => void) => {
        const file = event.target.files?.[0] || null;
        setter(file);
    };

    const handleSubmit = () => {
        if (projectName === "" || shortDescription === "" || longDescription === "" || maxStake === undefined || minStake === undefined || acceptedVToken === "" || fromDate === "" || toDate === "" || projectImage === null || projectLogo === null) {
            alert("Please fill all the fields");
            return;
        }
        try {
            router.push("/addProject/preview");
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="w-[90%] max-w-4xl p-8 bg-white rounded-3xl shadow-lg">
                    <div className="flex flex-col font-bold text-[#404040] gap-y-10">
                        <div className="">
                            Project Name
                            <div className="">
                                <input type="text"
                                    className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Project Name"
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="">
                            Short Description
                            <div className="">
                                <input type="text"
                                    className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Short Description"
                                    onChange={(e) => setShortDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Long Description */}
                        <div className="">
                            Long Description
                            <div className="">
                                <textarea
                                    className="w-full mt-5 px-4 pt-4 pb-24 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Long Description"
                                    onChange={(e) => setLongDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Project Imafe & Project Logo */}
                        <div className="grid grid-cols-2 gap-16">
                            <div className="">
                                Project Image
                                <div className="">
                                    <input type="file"
                                        className="w-full mt-5 px-4 py-24 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                        onChange={(e) => handleFileChange(e, setProjectImage)}
                                    />
                                </div>
                            </div>

                            <div className="">
                                Project Logo
                                <div className="">
                                    <input type="file"
                                        className="w-full mt-5 px-4 py-24 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                        onChange={(e) => handleFileChange(e, setProjectLogo)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Accepted VToken */}
                        <div className="">
                            Accepted VToken
                            <div className="">
                                <input type="text"
                                    className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Accepted VToken"
                                    onChange={(e) => setAcceptedVToken(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Max Stake */}
                        <div className="">
                            Max Stake
                            <div className="">
                                <input type="number"
                                    className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Max Stake"
                                    onChange={(e) => setMaxStake(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Min Stake */}
                        <div className="">
                            Min Stake
                            <div className="">
                                <input type="number"
                                    className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                    placeholder="Enter Min Stake"
                                    onChange={(e) => setMinStake(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* From & To Duration DateTime */}

                        <div className="grid grid-cols-2 gap-16">
                            <div className="">
                                From
                                <div className="">
                                    <input type="datetime-local"
                                        className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="">
                                To
                                <div className="">
                                    <input type="datetime-local"
                                        className="w-full mt-5 px-4 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-[#2a5697] focus:outline-none bg-[#f3f3f3]"
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                        {/* Submit button */}
                        <div className="flex justify-center mt-10 mb-4">
                            <button
                                className="w-8/12 px-10 py-3 text-white bg-[#6d93cd] hover:bg-[#2a5697] rounded-3xl"
                                onClick={handleSubmit}
                            >
                                Continue
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProjectDetailPage;