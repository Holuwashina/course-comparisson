"use client";
import Header from "@/app/components/Header";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Page({ params }) {
  const { id } = params;
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <div className="flex flex-col justify-between relative left-32 bg-white rounded-3xl py-10 pr-12 my-10">
            <div>
            <Typography variant="h1" className="font-extrabold">
              COMPUTER SCIENCE
            </Typography>
            <Typography
              variant="small"
              color="red"
              className="mb-2 text-[0.6rem] rounded-full border border-red-500 w-28 py-1 px-2"
            >
              UNDER GRADUATE
            </Typography>
            </div>
            <div className="">
              <Typography variant="small" color="red" className="text-[0.7rem] font-medium">
                Melbourne (Bundoora)
              </Typography>
              <Typography variant="small" color="red" className="font-medium">
              3 years full-time or part-time equivalent
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://www.latrobe.edu.au/courses/images/B-Computer-Science-LTU_ME_36879_1440.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
}
