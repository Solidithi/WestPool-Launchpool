"use client"
import VerticalProgressBar from "@/app/components/Progress";
import { useEffect, useState } from "react";

const ProjectDetailPage = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 15,
        hours: 10,
        minutes: 24,
        seconds: 59,
    });
    const steps = [
        { name: "Starting" },
        { name: "Funding" },
        { name: "Awaiting" },
        { name: "Distributing" },
    ];
    const [currentStep, setCurrentStep] = useState(2); // The active step index (e.g., 0-based)

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            } else {
                                clearInterval(timer); // Stop timer when countdown ends
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);





    return (
        <div>
            <div>
                {/* Navbar */}
            </div>
            <div className="ml-20">
                <div className="mt-20  flex">
                    <div className="basis-1/4">

                        <div className="rounded-lg w-64 h-32 object-cover border overflow-hidden">

                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnmrgCWfgo_sMSRqHXnOKALHltLHZeny-4w&s"
                                alt="Project Logo" />

                        </div>
                    </div>

                    {/* Project Area */}
                    <div className="basis-2/5">
                        <div className="flex">
                            <div className="text-2xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                                Project Name
                            </div>

                            <div className="ml-5 border rounded-xl px-5 flex items-center justify-center">
                                Status
                            </div>
                        </div>

                        <div className="mt-2 text-sm">
                            <span>

                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </span>
                        </div>
                    </div>


                    {/* Project Time */}
                    <div className="basis-1/3">
                        <div className="flex justify-center bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                            Remaining Time
                        </div>
                        {/* Date Time Countdown */}
                        <div className="grid grid-flow-col mt-3 gap-5 text-center auto-cols-max justify-center ">
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": `${timeLeft.days}` } as React.CSSProperties}></span>
                                </span>
                                days
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": `${timeLeft.hours}` } as React.CSSProperties}></span>
                                </span>
                                hours
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": `${timeLeft.minutes}` } as React.CSSProperties}></span>
                                </span>
                                min
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": `${timeLeft.seconds}` } as React.CSSProperties}></span>
                                </span>
                                sec
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pool Button */}
                <div className="mt-24 flex gap-16">
                    <div className="border rounded-2xl px-8 py-2">
                        FROST Pool
                    </div>

                    <div className="border rounded-2xl px-8 py-2">
                        VToken Pool
                    </div>

                    <div className="border rounded-2xl px-8 py-2">
                        More Detail
                    </div>

                </div>
            </div>

            {/* Similar to Binance */}
            <div className="flex mt-10">

                <div className=" ml-16 mr-16 border rounded-xl">
                    <div className="bg-black text-white p-6 rounded-xl">
                        {/* <!-- Main Container --> */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                            {/* <!-- Row 1 --> */}
                            <div>
                                <p className="text-gray-400">Tổng số token FDUSD được airdrop trong bể</p>
                                <p className="text-2xl font-bold text-white">720,000.0000 VANA</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Token khóa</p>
                                <p className="text-2xl font-bold text-green-500">● FDUSD</p>
                            </div>

                            {/* <!-- Row 2 --> */}
                            <div>
                                <p className="text-gray-400">Số token VANA được airdrop trong bể hôm nay</p>
                                <p className="text-2xl font-bold text-white">360,000.0000 VANA</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Tổng số token FDUSD bị khóa</p>
                                <p className="text-2xl font-bold text-white">1,213,004,343.2789 FDUSD</p>
                            </div>

                            {/* <!-- Row 3 --> */}
                            <div>
                                <p className="text-gray-400">Thời gian dự án</p>
                                <p className="text-2xl font-bold text-white">2 Ngày</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Người tham gia:</p>
                                <p className="text-2xl font-bold text-white">76.382</p>
                            </div>

                            {/* <!-- Row 4 --> */}
                            <div>
                                <p className="text-gray-400">Số lượng airdrop tối đa hàng giờ</p>
                                <p className="text-2xl font-bold text-white">1,500.0000 VANA</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="border rounded-xl w-96 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8 max-w-4xl flex">
                    <div className="flex-1">
                        <div className="">
                            <div className="text-2xl font-bold mb-4">Project Progress</div>
                            <p className="text-gray-300 mb-6">
                                If you have funded this project, we will be in touch to let you know when the
                                rewards have started distributing and when you can claim them. If you have
                                funded this project, we will be in touch to let you know when the rewards have
                                started distributing and when you can claim them.
                            </p>
                            <p className="text-gray-400 text-sm">
                                Follow us on{' '}
                                <a href="#" className="text-blue-400 underline">
                                    Twitter
                                </a>{' '}
                                or{' '}
                                <a href="#" className="text-blue-400 underline">
                                    Telegram
                                </a>{' '}
                                to keep updated.
                            </p>
                        </div>

                        <div className="flex">
                            <VerticalProgressBar steps={steps} currentStep={2} />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProjectDetailPage;