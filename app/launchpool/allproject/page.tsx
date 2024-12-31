"use client";
import StatCard from "../../components/StatCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { banners } from "../../constants/index";
import { dataTable } from "../../constants/index";
import { Project } from "../../interface/interface"

import { useEffect, useState } from "react";
import axios from "axios";

const AllProject = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [activeId, setActiveId] = useState(banners[0].id);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  //  ------------Xử lí khi mở nhiều row--------------
  const toggleRow = (index: number) => {
    const isCurrentlyExpanded = expandedRows.includes(index);
    setExpandedRows((current) =>
      isCurrentlyExpanded
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  const handleSelectImage = (id: string) => {
    setActiveId(id);
  };

  const route = useRouter();
  const handleSubmit = () => {
    route.push("/launchpool/addProject/verifyToken");
  };

  // const handleBannerClick = (event, id) => {
  //   event.preventDefault();
  // };

  // Phân loại dự án
  const liveProjects = projects.filter((data) => {
    const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return data.toDate && daysLeft > 0;
  });

  const expiredProjects = projects.filter((data) => {
    const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return !data.toDate || daysLeft <= 0;
  });


  //  ------------Gọi API--------------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/launchpool/allProject");
        const data = res.data;

        if (data.success) {
          setProjects(data.data);
        } else {
          console.error("Failed to fetch projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[80vh]">
    <span className="loading loading-dots loading-lg "></span>
  </div>;

  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10 ">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[72px] leading-[86px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Launchpool
        </h1>
        <button
          className="btn text-[#ffff] bg-[#6D93CD] w-[150px] animate-bounce"
          onClick={handleSubmit}
        >
          Add project
        </button>
      </div>

      {/* -------------------------Banner----------------------------- */}
      <div>
        <div className="carousel w-full">
          {banners.map((banner) => (
            <div
              key={banner.id}
              id={banner.id}
              className="carousel-item w-full flex  justify-center"
            >
              <Image
                src={banner.src}
                className="lg:w-[1400px] md:w-[800px] sm:w-[600px] h-[350px] rounded-lg "
                alt={banner.alt}
                width={banner.width}
                height={banner.height}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          {banners.map((banner, index) => (
            <Link
              key={banner.id}
              href={`#${banner.id}`}
              onClick={() => handleSelectImage(banner.id)}
              className={`btn btn-sm ${activeId === banner.id ? "bg-[#324664]" : "bg-[#6D93CD]"
                } text-white hover:bg-[#324664] active:bg-[#324664]`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* ----------------------------3 StatCard--------------------------------- */}

      <div className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
        <StatCard
          type="Total Project"
          count={100000}
          label="Total Project"
          icon="https://i.pinimg.com/736x/5f/30/dd/5f30dd9e794a5a509398b45cd38274c2.jpg"
        />
        <StatCard
          type="Unique Participant"
          count={100000}
          label="Unique Participant"
          icon="https://i.pinimg.com/736x/ab/df/23/abdf233a4de440510677808f1c234a87.jpg"
        />
        <StatCard
          type="Staked Amount"
          count={100000}
          label="Staked Amount"
          icon="https://i.pinimg.com/736x/90/af/12/90af12758c4f2881b57866bfeffc0d92.jpg"
        />
      </div>

      {/* ----------------------------Data Table--------------------------------- */}

      <div role="tablist" className="tabs tabs-lifted w-full ">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-[#7BA9EF] text-[15px]"
          aria-label="Live"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[#060f1f] border-base-300 rounded-box p-5"
        >
          <div className="w-full bg-[#102343]  shadow-lg rounded-2xl ">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[#82B2FA] text-center text-[20px] font-extralight border-b-[#E0E0E0]">
                    <th className="py-12"></th>
                    <th>Title</th>
                    {/* <th>Earned</th>
                    <th>Token</th> */}
                    <th>Total Staked</th>
                    <th>APR</th>
                    <th>Ends in</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {liveProjects
                    // .filter((data) => data.endsIn !== "--")
                    .map((data, index) => (
                      <>
                        <tr
                          onClick={() => toggleRow(index)}
                          className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 "
                        >
                          <th>{index + 1}</th>
                          <td>
                            <div className="flex items-center gap-4 justify-center">
                              <Image
                                src={data.projectLogo}
                                width={50}
                                height={50}
                                alt="icon"
                                className="rounded-full"
                              />
                              <div className="flex flex-col text-left gap-1">
                                <span className="text-[17px] font-bold">
                                  {data.projectName}
                                </span>
                                <span className="text-[12px] font-light text-[#DDDDDD]">
                                  {data.shortDescription}
                                </span>
                              </div>
                            </div>
                          </td>
                          {/* <td>{data.earned}</td>
                          <td>{data.token}</td> */}
                          <td>
                            {/* {data.invested} */}
                          </td>
                          <td>3.13%</td>
                          <td>
                            {data.toDate
                              ? (() => {
                                const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
                              })()
                              : "--"}
                          </td>

                        </tr>

                        {expandedRows.includes(index) && (
                          <tr className="bg-[#0D1C33] text-white ">
                            <td colSpan={7} className="p-4">
                              <div className="flex justify-between items-center p-2 gap-6">
                                <div className="w-[600px] ">
                                  <div className="flex justify-between mb-4">
                                    <span>APR:</span>
                                    {/* <span>{data.apr}</span> */}
                                  </div>
                                  <div className="flex justify-between mb-4">
                                    <span>Ends in:</span>
                                    <span>{data.toDate
                                      ? (() => {
                                        const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                        return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
                                      })()
                                      : "--"}</span>
                                  </div>
                                  <div className="flex justify-start items-center gap-2">
                                    <Link
                                      key={index}
                                      href={`/launchpool/projectDetail/${data.id}`}
                                      className="flex items-center flex-row gap-3"
                                    >
                                      <span className="text-[#7BA9EF]">
                                        View Project Detail
                                      </span>
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 5L11.2929 4.29289L12 3.58579L12.7071 4.29289L12 5ZM13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14L13 14ZM6.29289 9.29289L11.2929 4.29289L12.7071 5.70711L7.70711 10.7071L6.29289 9.29289ZM12.7071 4.29289L17.7071 9.29289L16.2929 10.7071L11.2929 5.70711L12.7071 4.29289ZM13 5L13 14L11 14L11 5L13 5Z"
                                          fill="#7BA9EF"
                                        />
                                        <path
                                          d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                          stroke="#7BA9EF"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex flex-col border border-[#7BA9EF] rounded-2xl p-4 w-full h-[100px] justify-between ">
                                  <div className="flex flex-row ">
                                    <span className="font-bold">EARNED</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <input
                                      type="text"
                                      value={0}
                                      className="bg-transparent"
                                    />
                                    <button className="bg-gray-500 text-white py-1 px-4 rounded-3xl h-[35px]">
                                      Harvest
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-col border border-[#7BA9EF] rounded-2xl p-4 w-full h-[100px] justify-between items-start gap-3">
                                  <span className="font-bold">
                                    START STAKING
                                  </span>
                                  <button className="ml-2 bg-[#6D93CD] text-white py-1 px-4 rounded-3xl w-full h-[40px]">
                                    Connect Wallet
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab  text-[#7BA9EF] text-[15px]"
          aria-label="Finished"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[#060f1f] border-base-300 rounded-box p-5"
        >
          <div className="w-full bg-[#102343]  shadow-lg rounded-2xl ">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[#82B2FA] text-center text-[20px] font-extralight border-b-[#E0E0E0]">
                    <th className="py-12"></th>
                    <th>Title</th>
                    {/* <th>Earned</th>
                    <th>Token</th> */}
                    <th>Total Staked</th>
                    <th>APR</th>
                    <th>Ends in</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {expiredProjects.map((data, index) => (
                    <>
                      <tr
                        onClick={() => toggleRow(index)}
                        className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 "
                      >
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-4 justify-center">
                            <Image
                              src={data.projectLogo}
                              width={50}
                              height={50}
                              alt="icon"
                              className="rounded-full"
                            />
                            <div className="flex flex-col text-left gap-1">
                              <span className="text-[17px] font-bold">
                                {data.projectName}
                              </span>
                              <span className="text-[12px] font-light text-[#DDDDDD]">
                                {data.shortDescription}
                              </span>
                            </div>
                          </div>
                        </td>
                        {/* <td>{data.earned}</td>
                          <td>{data.token}</td> */}
                        <td>
                          {/* {data.invested} */}
                        </td>
                        <td>3.13%</td>
                        <td>
                          {data.toDate
                            ? (() => {
                              const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                              return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
                            })()
                            : "--"}
                        </td>

                      </tr>

                      {expandedRows.includes(index) && (
                        <tr className="bg-[#0D1C33] text-white ">
                          <td colSpan={7} className="p-4">
                            <div className="flex justify-between items-center p-2 gap-6">
                              <div className="w-[600px] ">
                                <div className="flex justify-between mb-4">
                                  <span>APR:</span>
                                  {/* <span>{data.apr}</span> */}
                                </div>
                                <div className="flex justify-between mb-4">
                                  <span>Ends in:</span>
                                  <span>{data.toDate
                                    ? (() => {
                                      const daysLeft = Math.floor((new Date(data.toDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                      return daysLeft > 0 ? `${daysLeft} days left` : "Expired";
                                    })()
                                    : "--"}</span>
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                  <Link
                                    key={index}
                                    href={`/launchpool/projectDetail/${data.id}`}
                                    className="flex items-center flex-row gap-3"
                                  >
                                    <span className="text-[#7BA9EF]">
                                      View Project Detail
                                    </span>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 5L11.2929 4.29289L12 3.58579L12.7071 4.29289L12 5ZM13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14L13 14ZM6.29289 9.29289L11.2929 4.29289L12.7071 5.70711L7.70711 10.7071L6.29289 9.29289ZM12.7071 4.29289L17.7071 9.29289L16.2929 10.7071L11.2929 5.70711L12.7071 4.29289ZM13 5L13 14L11 14L11 5L13 5Z"
                                        fill="#7BA9EF"
                                      />
                                      <path
                                        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                                        stroke="#7BA9EF"
                                        stroke-width="2"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                              </div>
                              <div className="flex flex-col border border-[#7BA9EF] rounded-2xl p-4 w-full h-[100px] justify-between ">
                                <div className="flex flex-row ">
                                  <span className="font-bold">EARNED</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <input
                                    type="text"
                                    value={0}
                                    className="bg-transparent"
                                  />
                                  <button className="bg-gray-500 text-white py-1 px-4 rounded-3xl h-[35px]">
                                    Harvest
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-col border border-[#7BA9EF] rounded-2xl p-4 w-full h-[100px] justify-between items-start gap-3">
                                <span className="font-bold">
                                  START STAKING
                                </span>
                                <button className="ml-2 bg-[#6D93CD] text-white py-1 px-4 rounded-3xl w-full h-[40px]">
                                  Connect Wallet
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------ */}
    </div>
  );
};

export default AllProject;
