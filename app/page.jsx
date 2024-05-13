"use client";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {
  Alert,
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
import { useRouter } from "next/navigation.js";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({
    course1: "",
    course2: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleCourseChange = (selected, courseNumber) => {
    setSelectedCourses((prevState) => ({
      ...prevState,
      [courseNumber]: selected,
    }));
  };

  const handleSubmit = () => {
    const { course1, course2 } = selectedCourses;

    if (!course1 || !course2) return setError("Choose courses to compare!");

    if (course1 === course2)
      return setError("You can only compare different courses!");

    router.push(`/compare?c1=${course1}&c2=${course2}`);
  };

  return (
    <main>
      <Header />
      <Main>
        {/* Hero Section */}
        <div className="relative h-[450px] flex items-center justify-center">
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
                <h1 className="text-5xl font-extrabold z-10">
                  La Trobe University
                </h1>
                <h1 className="text-2xl font-extrabold z-10 uppercase tracking-wider">
                  Course Comparison Tool
                </h1>
                <p className="py-2 z-10">Discover Your Path with Confidence</p>
              </div>
              <div className="md:flex items-center gap-2 pt-8">
                <div className="w-96">
                  <Select
                    // value={selectedCourses.course1}
                    onChange={(selected) =>
                      handleCourseChange(selected, "course1")
                    }
                    size="lg"
                    label="Select Course"
                    labelProps={{
                      className: "text-white uppercase font-semibold",
                    }}
                    className="text-white uppercase font-bold tracking-wider"
                  >
                    {courses?.length > 0 ? (
                      courses?.map(({ name, id }, index) => (
                        <Option
                          className="uppercase font-semibold tracking-wider"
                          key={index}
                          value={id}
                        >
                          {name}
                        </Option>
                      ))
                    ) : (
                      <Option>Loading...</Option>
                    )}
                  </Select>
                </div>
                <Typography color="white">with</Typography>
                <div className="w-96">
                  <Select
                    // value={selectedCourses.course2}
                    onChange={(selected) =>
                      handleCourseChange(selected, "course2")
                    }
                    size="lg"
                    label="Select Course"
                    labelProps={{
                      className: "text-white uppercase font-semibold",
                    }}
                    className="text-white uppercase font-bold tracking-wider"
                  >
                    {courses?.length > 0 ? (
                      courses?.map(({ name, id }, index) => (
                        <Option
                          className="uppercase font-semibold tracking-wider"
                          key={index}
                          value={id}
                        >
                          {name}
                        </Option>
                      ))
                    ) : (
                      <Option>Loading...</Option>
                    )}
                  </Select>
                </div>
                <Button onClick={handleSubmit} className="bg-red-900 text-xs" size="lg">
                  Compare
                </Button>
              </div>
              <div className="min-h-14">
                {error && (
                  <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-medium text-red-400">
                    {error}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <section className="px-4 py-2 lg:px-44 lg:py-4 min-h-screen">
          <Alert className="rounded-none border-l-4 border-gray-100 bg-red-900 text-gray-100 uppercase font-bold tracking-wider">
            Featured Courses
          </Alert>
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
