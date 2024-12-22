"use client";
import Image from "next/image";
import Link from "next/link";

import { banners } from "../constants/index";
import { tokenTable } from "../constants/index";

import { useState } from "react";
const PreMarket = () => {
  const [activeId, setActiveId] = useState(banners[0].id);

  const handleSelectImage = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10 ">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[67px] leading-[60px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Pre-market
        </h1>
        <p className="text-[#A7B7DB]">Your Early Update on Financial Markets</p>
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
              className={`btn btn-sm ${
                activeId === banner.id ? "bg-[#324664]" : "bg-[#6D93CD]"
              } text-white hover:bg-[#324664] active:bg-[#324664]`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* ----------------------------Data Table--------------------------------- */}

      <div className="w-full bg-[#102343]  shadow-lg rounded-2xl ">
        <div className="overflow-x-auto ">
          <table className="table">
            <thead>
              <tr className="text-[#82B2FA] text-center text-[20px] font-extralight border-b-[#E0E0E0]">
                <th className="py-12 flex justify-start pl-10">Name</th>
                <th>Price</th>
                <th>1 hour</th>
                <th>1 day</th>
                <th>Volume 24h</th>
                <th>Liquidity</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tokenTable.map((data, index) => (
                <>
                  <tr className="cursor-pointer  text-white border-b border-[#E0E0E0] last:border-b-0 ">
                    <td>
                      <Link
                        key={index}
                        href={`/tokenOffer/${index + 1}`}
                        className="flex items-center gap-4 justify-start pl-6 transform hover:-translate-y-1 hover:scale-105 duration-300"
                      >
                        <Image
                          src={data.icon}
                          width={50}
                          height={50}
                          alt="icon"
                          className="rounded-full"
                        />
                        <div className=" text-left ">
                          <span className="text-[17px] font-bold">
                            {data.name}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td>{data.price}</td>
                    <td
                      className={`${
                        parseFloat(data.change1h) >= 0
                          ? "text-green-500 font-bold"
                          : "text-red-500 font-bold"
                      }`}
                    >
                      {data.change1h}
                    </td>
                    <td
                      className={`${
                        parseFloat(data.change1h) >= 0
                          ? "text-green-500 font-bold"
                          : "text-red-500 font-bold"
                      }`}
                    >
                      {data.change1d}
                    </td>
                    <td>{data.marketCap}</td>
                    <td>{data.volume}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------------ */}
    </div>
  );
};

export default PreMarket;
