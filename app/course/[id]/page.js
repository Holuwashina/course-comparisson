"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Spinner, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page({ params }) {
  const { id } = params;

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course || !course.imageUrl) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <div className="flex flex-col justify-between relative left-32 bg-white rounded-3xl py-10 pr-20 my-10">
            <div>
              <Typography variant="h1" className="font-extrabold uppercase">
                {course.name.split(" ")[0]}{" "}
                <span className="text-red-600 uppercase">
                  {course.name.split(" ")[1]}
                </span>
              </Typography>
              <Typography
                variant="small"
                color="red"
                className="mb-2 text-[0.6rem] rounded-full border border-red-500 w-28 py-1 px-2 uppercase"
              >
                {course.type}
              </Typography>
            </div>
            <div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="red"
                    d="M12 2h.5q.25 0 .5.05v2.025q-.25-.05-.488-.063T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35q3.05-2.8 4.525-5.087T18 10.2V10h2v.2q0 1.65-.763 3.275t-1.824 3.05t-2.2 2.538t-1.888 1.762q-.275.25-.625.375t-.7.125t-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2m0 10q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m6-7v2q0 .425.288.713T19 8t.713-.288T20 7V5h2q.425 0 .713-.288T23 4t-.288-.712T22 3h-2V1q0-.425-.288-.712T19 0t-.712.288T18 1v2h-2q-.425 0-.712.288T15 4t.288.713T16 5z"
                  />
                </svg>
                <Typography
                  variant="small"
                  color="red"
                  className="px-2 text-[0.7rem] font-medium"
                >
                  {course.institution.location}
                </Typography>
              </div>

              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="red"
                    d="M11 17h2v-3h3v-2h-3V9h-2v3H8v2h3zm1 5q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13t.713-3.512t1.924-2.85t2.85-1.925T12 4t3.513.713t2.85 1.925t1.925 2.85T21 13t-.712 3.513t-1.925 2.85t-2.85 1.925T12 22M5.6 2.35L7 3.75L2.75 8l-1.4-1.4zm12.8 0l4.25 4.25l-1.4 1.4L17 3.75zM12 20q2.925 0 4.963-2.037T19 13t-2.037-4.962T12 6T7.038 8.038T5 13t2.038 4.963T12 20"
                  />
                </svg>
                <Typography
                  variant="small"
                  color="red"
                  className="px-2 font-medium"
                >
                  {course.duration}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={`${course.imageUrl}`}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/* Tabs Section */}
      <div className="px-40">
        <TabsComponent />
      </div>
      <Footer />
    </>
  );
}

function TabsComponent() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const data = [
    {
      label: "Overview",
      value: "overview",
      desc: ''
    },
    {
      label: "Entry Requirement",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "What you'll study",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Career Opportunities",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    // {
    //   label: "Learning Guide",
    //   value: "angular",
    //   desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
    // {
    //   label: "pathway",
    //   value: "svelte",
    //   desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];
  return (
    <Tabs value={activeTab} className="border-t-2 py-5">
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`${
              activeTab === value ? "text-red-600" : ""
            } text-xs uppercase font-extrabold`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
              <Markdown className="prose prose-slate max-w-none" remarkPlugins={[remarkGfm]}>{desc}</Markdown>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
