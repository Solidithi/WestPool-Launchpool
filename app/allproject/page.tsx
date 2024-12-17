"use client";
import StatCard from "../components/StatCard";
import Image from "next/image";

import { banners } from "../constants/index";

import { useState, useEffect } from "react";

const allProject = () => {
  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[52px] leading-[56px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Launchpool
        </h1>
        <p className="text-[#A7B7DB]">Choose your favorite project!!!!</p>
      </div>

      {/* -------------------------Banner----------------------------- */}

      <div className="carousel w-full ">
        {banners.map((banner) => (
          <div
            key={banner.id}
            id={banner.id}
            className="carousel-item w-full flex  justify-center"
          >
            <Image
              src={banner.src}
              className="lg:w-[1000px] md:w-[800px] sm:w-[600px] h-[350px] rounded-lg "
              alt={banner.alt}
              width={banner.width}
              height={banner.height}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {banners.map((banner, index) => (
          <a
            key={banner.id}
            href={`#${banner.id}`}
            className="btn btn-sm bg-[#6D93CD] text-white hover:bg-[#324664] active:bg-[#324664]"
          >
            {index + 1}
          </a>
        ))}
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
    </div>
  );
};

export default allProject;
