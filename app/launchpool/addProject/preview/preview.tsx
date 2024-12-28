"use client";
import VerticalProgressBar from "@/app/components/Progress";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  useProjectBasisStore,
  useProjectDetailStore,
  useVerifiedToken,
} from "@/app/zustand/store";
import StatusDisplay from "@/app/components/Status";
import axios from "axios";
const PreviewPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [projectStatus, setProjectStatus] = useState("upcoming");

  const {
    acceptedVToken,
    minStake,
    maxStake,
    projectName,
    projectLogo,
    projectImage,
    shortDescription,
    longDescription,
    fromDate,
    toDate,
  } = useProjectDetailStore();

  const { verifiedToken } = useVerifiedToken() as { verifiedToken: string };

  const steps = [{ name: "Debut" }, { name: "Staking" }, { name: "End" }];
  const [currentStep, setCurrentStep] = useState(2); // The active step index (e.g., 0-based)
  const [activeButton, setActiveButton] = useState(acceptedVToken[0]);

  const { chain, poolBudget, targetStake } = useProjectBasisStore();



  useEffect(() => {
    const calculateInitialTimeLeft = (from: string, to: string) => {
      const fromTime = new Date(from);
      const toTime = new Date(to);

      if (fromTime > new Date()) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const diffInMs = toTime.getTime() - fromTime.getTime();
      if (diffInMs <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffInMs / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    const initialTimeLeft = calculateInitialTimeLeft(fromDate, toDate);
    setTimeLeft(initialTimeLeft);
  }, [fromDate, toDate]);




  // Countdown logic
  useEffect(() => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      return;
    }

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
                clearInterval(timer); // Dừng khi hết thời gian
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp interval khi unmount
  }, [timeLeft]);


  const handleSubmit = async () => {
    //log all the data below
    console.log(
      "Project Name: " + projectName + "\n" +
      "Verified Token: " + verifiedToken + "\n" +
      "Project Logo: " + projectLogo + "\n" +
      "Project Image: " + projectImage + "\n" +
      "Short Description" + shortDescription + "\n" +
      "Long Description" + longDescription + "\n" +
      "Accepted VToken" + acceptedVToken + "\n" +
      "Min Stake" + minStake + "\n" +
      "Max Stake" + maxStake + "\n" +
      "From Date" + fromDate + "\n" +
      "To Date" + toDate + "\n"
    );
    const response = await axios.post("/api/launchpool/addProject", {
      projectName,
      verifiedToken,
      projectLogo,
      projectImage,
      shortDescription,
      longDescription,
      acceptedVToken,
      minStake,
      maxStake,
      fromDate,
      toDate,
      projectStatus,
    })

    console.log(response);
    if (response.status === 200) {
      alert("Success");
    }
  };

  return (
    <div>
      <div className="ml-20">
        <div className="mt-20  flex justify-between px-8 w-full">
          <div className="flex flex-row items-center gap-5">
            <div className="basis-1/4">
              {/* <div className="rounded-lg w-64 h-32 object-cover border overflow-hidden"> */}
              <Image
                src={projectLogo}
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
                  {projectName}
                </div>

                {/* if the status is ongoing then show the following div else if the status is completed then show the following div but with red color else if the status is upcoming then show the following div but with yellow color */}
                <StatusDisplay status="upcoming" />
                {/* <div className="ml-5 rounded-xl px-5 flex items-center justify-center bg-[#102821] text-[#0E9A36]">
                  On going
                </div> */}
              </div>

              <div className="mt-2 text-sm">
                <span>{shortDescription}</span>
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
          {acceptedVToken.map((token, index) => (
            <button
              key={index}
              className={`btn btn-ghost rounded-3xl px-8 py-2 text-white transition-colors duration-300 ${activeButton === token ? "bg-[#6D93CD]" : "bg-transparent"
                }`}
              onClick={() => setActiveButton(token)}
            >
              {token} Pool
            </button>
          ))}


          {/* <button
            className={`btn btn-ghost rounded-3xl px-8 py-2 text-white transition-colors duration-300 ${activeButton === "VToken" ? "bg-[#6D93CD]" : "bg-transparent"
              }`}
            onClick={() => setActiveButton("VToken")}
          >
            VToken Pool
          </button> */}

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
        {acceptedVToken.map((token, index) => (
          activeButton === token && (
            <div
              key={index}
              className="ml-16 mr-16 border rounded-xl w-[60%]"
            >
              <div className="text-white p-6 rounded-xl">
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
                    <p className="text-lg font-bold text-green-500">
                      ● {activeButton}
                    </p>
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
                      1,213,004,343.2789 {activeButton}
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
          )
        ))}





        {activeButton === "MoreDetail" && (
          <div className=" ml-16 mr-16 border  rounded-xl w-[60%]">
            <div className="flex flex-col gap-5 text-white p-6 rounded-xl">
              {/* <!-- Main Container --> */}
              <div className="flex flex-row flex-wrap gap-5">
                {projectImage.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="Project Logo"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-64 h-32"
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <span className="text-[20px] font-light">Chain: <span className="text-[20px] font-bold">{chain}</span></span>
                <span className="text-[20px] font-light">Pool Budget: <span className="text-[20px] font-bold">{poolBudget}</span></span>
                <span className="text-[20px] font-light">Target Stake: <span className="text-[20px] font-bold">{targetStake}</span></span>
              </div>


              <div className="grid grid-cols-2 gap-y-6 gap-x-12 ">
                {longDescription}
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
              <VerticalProgressBar steps={steps} currentStep={0} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-10 pl-24 pr-[28px]">
        <button className="btn w-full bg-[#6D93CD] text-white"
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  );
};

export default PreviewPage;
