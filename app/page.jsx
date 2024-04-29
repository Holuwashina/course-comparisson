"use client";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {
  Button,
  Navbar,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Main from "./components/Main.jsx";
import Image from "next/image.js";
import { CourseCard } from "./components/CourseCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main>
      <Header />
      <Main>
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/background.webp"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-full w-full relative flex flex-col justify-center text-white bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="px-4 py-2 lg:px-44 lg:py-4">
              <div className="w-[700px]">
                <h1 className="text-4xl font-extrabold z-10">
                  La Trobe University
                </h1>
                <h1 className="text-2xl font-extrabold z-10">
                  Course Comparisson Tool
                </h1>
                <p className="py-2 z-10">Discover Your Path with Confidence</p>
              </div>
              <div className="flex items-center gap-2 pt-8">
                <div className="w-96">
                  <Select
                    size="lg"
                    label="Select Course"
                    labelProps={{
                      className: "text-white",
                    }}
                    className="text-white"
                  >
                    {courses?.map((course, index) => (
                      <Option key={index}>{course.title}</Option>
                    ))}
                  </Select>
                </div>
                <Typography color="white">with</Typography>
                <div className="w-96">
                  <Select
                    size="lg"
                    label="Select Course"
                    labelProps={{
                      className: "text-white",
                    }}
                    className="text-white"
                  >
                    {courses?.map((course, index) => (
                      <Option key={index}>{course.title}</Option>
                    ))}
                  </Select>
                </div>
                <Button color="red" size="lg">
                  Compare Course
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <section className="px-4 py-2 lg:px-44 lg:py-4 min-h-screen">
          <Typography
            variant="h6"
            className="font-extrabold p-2 border-l-4 border-red-900 border-b uppercase"
          >
            Top Courses
          </Typography>
          <div className="flex gap-4 pb-[36px]">
            {courses?.length > 0 ? (
              courses?.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </section>
      </Main>
      <Footer />
    </main>
  );
}
