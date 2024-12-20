"use client";
import VerticalProgressBar from "@/app/components/Progress";
import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [activeButton, setActiveButton] = useState("FROST");

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
      <div className="ml-20">
        <div className="mt-20  flex justify-between px-8 w-full">
          <div className="flex flex-row items-center gap-5">
            <div className="basis-1/4">
              {/* <div className="rounded-lg w-64 h-32 object-cover border overflow-hidden"> */}
              <Image
                src="https://i.pinimg.com/736x/8d/9f/09/8d9f095f1c59bba933ce67c7cf7fe508.jpg"
                alt="Project Logo"
                width={400}
                height={300}
                className="rounded-lg object-cover w-64 h-32"
              />
              {/* </div> */}
            </div>

            {/* Project Area */}
            <div className="basis-3/5">
              <div className="flex">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                  Project Name
                </div>

                <div className="ml-5 rounded-xl px-5 flex items-center justify-center bg-[#102821] text-[#0E9A36]">
                  On going
                </div>
              </div>

              <div className="mt-2 text-sm">
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </span>
              </div>
            </div>
          </div>

          {/* Project Time */}
          <div className="basis-1/3">
            <div className="flex justify-center bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
              Remaining Time
            </div>
            {/* Date Time Countdown */}
            <div className="grid grid-flow-col mt-3 gap-2 text-center auto-cols-max justify-center ">
              <div className="flex flex-col p-2  rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl rounded-full border-[#82B2FA] border-2 p-3 text-white text-[22px]">
                  <span
                    style={
                      { "--value": `${timeLeft.days}` } as React.CSSProperties
                    }
                  ></span>
                </span>
                <span className="mt-4 text-white">days</span>
              </div>
              <div className="flex flex-col p-2  rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl rounded-full border-[#82B2FA] border-2 p-3 text-white text-[22px]">
                  <span
                    style={
                      { "--value": `${timeLeft.hours}` } as React.CSSProperties
                    }
                  ></span>
                </span>
                <span className="mt-4 text-white">hours</span>
              </div>
              <div className="flex flex-col p-2 rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl rounded-full border-[#82B2FA] border-2 p-3 text-white text-[22px]">
                  <span
                    style={
                      {
                        "--value": `${timeLeft.minutes}`,
                      } as React.CSSProperties
                    }
                  ></span>
                </span>
                <span className="mt-4 text-white">min</span>
              </div>
              <div className="flex flex-col p-2 rounded-box text-neutral-content">
                <span className="countdown font-mono text-4xl rounded-full border-[#82B2FA] border-2 p-3 text-white text-[22px]">
                  <span
                    style={
                      {
                        "--value": `${timeLeft.seconds}`,
                      } as React.CSSProperties
                    }
                  ></span>
                </span>
                <span className="mt-4 text-white">sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Button */}
        <div className="mt-24 flex gap-5 px-8">
          <button
            className={`btn btn-ghost rounded-3xl px-8 py-2 text-white transition-colors duration-300 ${
              activeButton === "FROST" ? "bg-[#6D93CD]" : "bg-transparent"
            }`}
            onClick={() => setActiveButton("FROST")}
          >
            FROST Pool
          </button>

          <button
            className={`btn btn-ghost rounded-3xl px-8 py-2 text-white transition-colors duration-300 ${
              activeButton === "VToken" ? "bg-[#6D93CD]" : "bg-transparent"
            }`}
            onClick={() => setActiveButton("VToken")}
          >
            VToken Pool
          </button>

          <button
            className="btn btn-ghost rounded-lg px-8 py-2 bg-[#2A5697] text-white"
            onClick={() => setActiveButton("MoreDetail")}
          >
            More Detail
          </button>
        </div>
      </div>

      {/* Similar to Binance */}
      <div className="flex mt-10 w-full p-8 h-auto">
        {activeButton === "FROST" && (
          <div className=" ml-16 mr-16 border  rounded-xl w-[60%]">
            <div className=" text-white p-6 rounded-xl">
              {/* <!-- Main Container --> */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                {/* <!-- Row 1 --> */}
                <div>
                  <p className="text-gray-400 text-lg">
                    Total FDUSD tokens airdropped in the pool
                  </p>
                  <p className="text-lg font-bold text-white">
                    720,000.0000 VANA
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Locked token</p>
                  <p className="text-lg font-bold text-green-500">● FDUSD</p>
                </div>

                {/* <!-- Row 2 --> */}
                <div>
                  <p className="text-gray-400 text-lg">
                    Number of VANA tokens airdropped in the pool today
                  </p>
                  <p className="text-lg font-bold text-white">
                    360,000.0000 VANA
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">
                    Total FDUSD tokens locked
                  </p>
                  <p className="text-lg font-bold text-white">
                    1,213,004,343.2789 FDUSD
                  </p>
                </div>

                {/* <!-- Row 3 --> */}
                <div>
                  <p className="text-gray-400 text-lg ">Project duration</p>
                  <p className="text-lg font-bold text-white">2 Days</p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Participants</p>
                  <p className="text-lg font-bold text-white">76,382</p>
                </div>

                {/* <!-- Row 4 --> */}
                <div>
                  <p className="text-gray-400 text-lg ">
                    Maximum hourly airdrop amount
                  </p>
                  <p className="text-lg font-bold text-white">
                    1,500.0000 VANA
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeButton === "VToken" && (
          <div className=" ml-16 mr-16 border  rounded-xl w-[60%]">
            <div className=" text-white p-6 rounded-xl">
              {/* <!-- Main Container --> */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                {/* <!-- Row 1 --> */}
                <div>
                  <p className="text-gray-400 text-lg">
                    Total ABC tokens airdropped in the pool
                  </p>
                  <p className="text-lg font-bold text-white">
                    1,000,000.0000 ABC
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Locked token</p>
                  <p className="text-lg font-bold text-red-600">● XYZ</p>
                </div>

                {/* <!-- Row 2 --> */}
                <div>
                  <p className="text-gray-400 text-lg">
                    Number of ABC tokens airdropped in the pool today
                  </p>
                  <p className="text-lg font-bold text-white">
                    500,000.0000 ABC
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">
                    Total XYZ tokens locked
                  </p>
                  <p className="text-lg font-bold text-white">
                    2,000,000,000.0000 XYZ
                  </p>
                </div>

                {/* <!-- Row 3 --> */}
                <div>
                  <p className="text-gray-400 text-lg ">Project duration</p>
                  <p className="text-lg font-bold text-white">5 Days</p>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Participants</p>
                  <p className="text-lg font-bold text-white">123,456</p>
                </div>

                {/* <!-- Row 4 --> */}
                <div>
                  <p className="text-gray-400 text-lg ">
                    Maximum hourly airdrop amount
                  </p>
                  <p className="text-lg font-bold text-white">3,000.0000 ABC</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeButton === "MoreDetail" && (
          <div className=" ml-16 mr-16 border  rounded-xl w-[60%]">
            <div className=" text-white p-6 rounded-xl">
              {/* <!-- Main Container --> */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                More Detail content
              </div>
            </div>
          </div>
        )}

        <div className="border rounded-xl  bg-[#465377] text-white w-[40%]">
          <div className="flex-row flex items-stretch justify-between">
            <div className="p-8">
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#82B2FA] to-[#FFFFFF] bg-clip-text text-transparent">
                Project Progress
              </div>
              <p className="text-gray-300 mb-6 w-64">
                If you have funded this project, we will be in touch to let you
                know when the rewards have started distributing and when you can
                claim them.
              </p>
              <p className="text-gray-400 text-sm">
                Follow us on
                <a href="#" className="text-blue-400 underline">
                  Twitter
                </a>
                or
                <a href="#" className="text-blue-400 underline">
                  Telegram
                </a>
                to keep updated.
              </p>
            </div>
            {/* <div className="border-l border-gray-400 self-stretch mx-8"></div> */}
            <div className="p-8">
              <VerticalProgressBar steps={steps} currentStep={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
