"use client"
import { useEffect, useState } from "react";

const ProjectDetailPage = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 15,
        hours: 10,
        minutes: 24,
        seconds: 59,
    });

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
                    <div className="basis-1/2">
                        <div className="flex">
                            <div className="text-2xl font-bold">
                                Project Name
                            </div>

                            <div className="ml-5 border rounded-xl px-5 flex items-center justify-center">
                                Status
                            </div>
                        </div>

                        <div className="mt-2">
                            <span>

                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </span>
                        </div>
                    </div>


                    {/* Project Time */}
                    <div className="basis-1/4">
                        <div className="flex justify-center">
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
            <div className="mt-10 ml-16 mr-16 border rounded-xl">
                <div className="bg-black text-white p-6 rounded-md">
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
        </div >
    )
}

export default ProjectDetailPage;