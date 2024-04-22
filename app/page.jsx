"use client";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {
  Button,
  Navbar,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import Main from "./components/Main.jsx";
import Image from "next/image.js";
import { CourseCard } from "./components/CourseCard.jsx";

const courses = [
  {
    id: "bhkjkdwcjklcke",
    title: "Computer Science",
    type: "Under Graduate",
    description:
      "Computer Science is the study of algorithms, computation, and programming. It covers a broad range of topics, including software development, data structures, algorithms, artificial intelligence, and computer systems. Students learn to design and analyze algorithms, develop software applications, and solve complex computational problems.",
  },
  {
    id: "bhkjkdwcjklckejkjkd",
    title: "Cyber Security",
    type: "Under Graduate",
    description:
      "Information Technology focuses on managing and utilizing technology to solve business problems and improve efficiency. IT professionals design, implement, and maintain IT systems, networks, and databases. Coursework includes topics such as IT infrastructure management, cybersecurity, cloud computing, project management, and database administration.",
  },
  {
    id: "xjhskkdwcjklcke",
    title: "Information Technology",
    type: "Under Graduate",
    description:
      "Cyber Security is dedicated to protecting digital systems, networks, and data from unauthorized access, attacks, and threats. Students learn about network security, cryptography, ethical hacking, incident response, and compliance. Cyber Security professionals play a critical role in safeguarding sensitive information and ensuring the integrity and confidentiality of digital assets.",
  },
];

export default function Home() {
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
                    {courses.map((course, index) => (
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
                    {courses.map((course, index) => (
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
        <section className="px-4 py-2 lg:px-44 lg:py-4">
          <Typography
            variant="h6"
            className="font-extrabold p-2 border-l border-l-4 border-red-900 border-b uppercase"
          >
            Top Courses
          </Typography>
          <div className="flex gap-4 pb-[36px]">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </section>
      </Main>
      <Footer />
    </main>
  );
}
