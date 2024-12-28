"use client";
import VerticalProgressBar from "@/app/components/Progress";
import { useEffect, useState } from "react";
import Image from "next/image";
import StatusDisplay from "@/app/components/Status";
type Status = "upcoming" | "ongoing" | "completed";

const ProjectDetailPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 59,
  });
  const steps = [{ name: "Debut" }, { name: "Staking" }, { name: "End" }];
  const [currentStep, setCurrentStep] = useState(2); // The active step index (e.g., 0-based)
  const [status, setStatus] = useState<Status>("upcoming");
  const [activeButton, setActiveButton] = useState("FROST");

  const [stakeAmount, setStakeAmount] = useState("");
  const [totalStaked, setTotalStaked] = useState(0);

  //Create these state var acceptedVToken,
  // minStake,
  // maxStake,
  // projectName,
  // projectLogo,
  // projectImage,
  // shortDescription,
  // longDescription,
  // fromDate,
  // toDate

  const [projectName, setProjectName] = useState<string>("");
  const [projectLogo, setProjectLogo] = useState<File | null>(null);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [shortDescription, setShortDescription] = useState<string>("");
  const [longDescription, setLongDescription] = useState<string>("");
  const [acceptedVToken, setAcceptedVToken] = useState<string>("");
  const [minStake, setMinStake] = useState<number | undefined>(undefined);
  const [maxStake, setMaxStake] = useState<number | undefined>(undefined);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

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

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (amount > 0 && amount != null) {
      setTotalStaked((prevTotal) => prevTotal + amount);
      setStakeAmount("");
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
                  {projectName}
                </div>

                <StatusDisplay status={status} />
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

      <div className=" text-white ml-20">
        <div
          className="flex gap-40 w-full h-auto mt-10  px-8 
        sm:grid sm:grid-rows-2 sm:grid-flow-col sm:gap-20 md:grid md:grid-rows-2 md:grid-flow-col md:gap-20  lg:grid lg:grid-rows-2 lg:grid-flow-col lg:gap-20  xl:flex xl:flex-row xl:gap-40"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 w-full">
              <Image
                src="https://i.pinimg.com/736x/e4/29/e6/e429e66ab46e2c9d94f4921f70682ac1.jpg"
                width={50}
                height={50}
                alt="icon"
                className="rounded-full"
              />
              <span className="text-[20px] font-bold">My money</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#CACACA]">
                FDUSD Tokens Locked
              </span>
              <span className="text-[36px] text-white font-bold">
                {totalStaked} FDUSD
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-[#a7a7a7]">
                Available: 0.0000 FDUSD
              </span>
              <div className="flex gap-5">
                <button
                  className=" bg-[#6D93CD] text-white rounded-md px-2 py-2 text-[13px] flex justify-center w-[300px] hover:scale-105 duration-300"
                  onClick={() =>
                    (
                      document.getElementById("lock") as HTMLDialogElement
                    ).showModal()
                  }
                >
                  Lock
                </button>
                <dialog id="lock" className="modal">
                  <div className="modal-box bg-[#2D468D]">
                    <h3 className="font-bold text-lg mb-4 text-white">
                      Please enter how many token you want to stake
                    </h3>

                    <div className="bg-[#5A78B8] rounded-lg p-4 mb-4 relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#abcaf7] font-bold text-sm">
                          Staking
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <input
                          type="number"
                          className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none 
                          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                          placeholder="enter"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleStake}
                      className="btn bg-white text-[#7BA9EF] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#2C3E6F]"
                    >
                      Stake
                    </button>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                <button
                  className=" bg-[#2A5697] text-white rounded-md px-2 py-2 text-[13px] flex justify-center w-[100px] hover:scale-105 duration-300"
                  // onClick={() =>
                  //   (
                  //     document.getElementById("unlock") as HTMLDialogElement
                  //   ).showModal()
                  // }
                >
                  Unlock
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 w-full">
              <Image
                src="https://i.pinimg.com/736x/e4/29/e6/e429e66ab46e2c9d94f4921f70682ac1.jpg"
                width={50}
                height={50}
                alt="icon"
                className="rounded-full"
              />
              <span className="text-[20px] font-bold">
                My airdrop&apos;s token
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#CACACA]">
                Number of airdrop tokens not received
              </span>
              <span className="text-[36px] text-white font-bold">-- VANA</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-5 mt-[30px]">
                <button
                  className=" bg-[#6D93CD] text-white rounded-md px-2 py-2 text-[13px] flex justify-center w-[300px] hover:scale-105 duration-300"
                  onClick={() =>
                    (
                      document.getElementById("airdrop") as HTMLDialogElement
                    ).showModal()
                  }
                >
                  Receive token airdrop
                </button>
                <dialog id="airdrop" className="modal">
                  <div className="modal-box bg-[#2D468D]"></div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 mt-[75px]">
              <span className="text-[16px] text-[#CACACA]">
                Summary of airdrop token
              </span>
              <span className="text-[36px] text-white font-bold">-- VANA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar to Binance */}
      <div className="flex mt-10 w-full p-8 h-auto">
        {activeButton === "FROST" && (
          <div className=" ml-16 mr-16 border  rounded-xl w-[60%]">
            <div className=" text-white p-6 rounded-xl">
              {/* <!-- Main Container --> */}
              <div className="lg:grid lg:grid-cols-2 gap-y-6 gap-x-12 md:flex md:flex-col md:gap-6 sm:flex sm:flex-col sm:gap-6">
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
              <div className="lg:grid lg:grid-cols-2 gap-y-6 gap-x-12 md:flex md:flex-col md:gap-6 sm:flex sm:flex-col sm:gap-6">
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
              <div className="lg:grid lg:grid-cols-2 gap-y-6 gap-x-12 md:flex md:flex-col md:gap-6 sm:flex sm:flex-col sm:gap-6">
                {longDescription}
              </div>
            </div>
          </div>
        )}

        <div className="border rounded-xl  bg-[#465377] text-white w-[40%]">
          <div className="xl:flex-row flex items-stretch justify-between md:flex-col md:gap-5 sm:flex-col smL:gap-5">
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
