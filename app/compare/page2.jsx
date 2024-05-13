"use client";
import Main from "../components/Main.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Navbar,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState(null);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState({
    course1: "",
    course2: "",
  });

  const c1 = searchParams.get("c1");
  const c2 = searchParams.get("c2");

  const fetchCourses = async (arg1, arg2) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/courses/compare?c1=${arg1}&c2=${arg2}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourse();

    if (c1 && c2) {
      fetchCourses(c1, c2);
    }
  }, [c1, c2]);

  const handleCourseChange = (selected, courseNumber) => {
    setSelectedCourses((prevState) => ({
      ...prevState,
      [courseNumber]: selected,
    }));
  };

  const handleSubmit = async () => {
    const { course1, course2 } = selectedCourses;

    if (!course1 || !course2) return setError("Choose courses to compare!");

    if (course1 === course2)
      return setError("You can only compare different courses!");

    await fetchCourses(course1, course2);
  };

  if (c1 && c2 && !courses) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main>
      <Header />
      <Main>
        {/* Hero Section */}
        <div className="bg-red-900 h-[450px]">
          <div className="px-4 py-2 lg:px-44 lg:py-4">
            <div className="pt-10 text-white">
              <h1 className="text-5xl font-extrabold z-10">
                La Trobe University
              </h1>
              <h1 className="text-2xl font-extrabold z-10 uppercase tracking-wider">
                Course Comparison Tool
              </h1>
              <p className="py-2 z-10">Discover Your Path with Confidence</p>
            </div>
            <div className="flex items-center gap-2 pt-8">
              <div className="w-96">
                <Select
                  //value={selectedCourses.course1}
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
                  {course?.length > 0 ? (
                    course?.map(({ name, id }, index) => (
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
                  {course?.length > 0 ? (
                    course?.map(({ name, id }, index) => (
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
              <Button
                disabled={loading ? true : false}
                color="teal"
                variant="gradient"
                onClick={handleSubmit}
                size="lg"
              >
                {loading ? "loading..." : "Compare Course"}
              </Button>
            </div>
            <div className="min-h-14">
              {error && (
                <Alert className="rounded-none border-l-4 border-white bg-white/10  text-white italic">
                  {error}
                </Alert>
              )}
            </div>
          </div>
        </div>
        {!courses ? (
          <div className="px-8 xl:px-40 mt-[-7%] animate-pulse min-h-screen">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="h-96 bg-white italic">
                <p className="p-5 text-red-900">
                  Waiting for courses to compare...
                </p>
              </div>
              <div className="h-96 bg-white">
                <p className="p-5 text-red-900">
                  Waiting for courses to compare...
                </p>
              </div>
            </div>
            <hr />
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="h-96 bg-red-900"></div>
              <div className="h-96 bg-red-900"></div>
            </div>
          </div>
        ) : (
          <div className="px-8 xl:px-40 mt-[-10%]">
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Card className="mt-6 shadow-none border rounded-none border-red-600 mb-4">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 font-extrabold uppercase"
                    >
                      {courses?.course1?.name}
                    </Typography>
                    <p className="line-clamp-3">
                      {courses?.course1?.description}
                    </p>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <a
                      href={`/course/${courses?.course1?.id}`}
                      className="text-red-600 text-xs uppercase font-semibold tracking-wider"
                    >
                      Read More
                    </a>
                  </CardFooter>
                </Card>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Overview
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course1?.CourseDetail[0]?.content,
                  }}
                />
              </div>
              <div>
                <Card className="mt-6 shadow-none border rounded-none border-red-600 mb-4">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 font-extrabold uppercase"
                    >
                      {courses?.course2?.name}
                    </Typography>
                    <p className="line-clamp-3">
                      {courses?.course2?.description}
                    </p>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <a
                      href={`/course/${courses?.course2?.id}`}
                      className="text-red-600 text-xs uppercase font-semibold tracking-wider"
                    >
                      Read More
                    </a>
                  </CardFooter>
                </Card>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Overview
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course2?.CourseDetail[0]?.content,
                  }}
                />
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Entry Requirement
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course1?.CourseDetail[1]?.content,
                  }}
                />
              </div>
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Entry Requirement
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course2?.CourseDetail[1]?.content,
                  }}
                />
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  {`What you'll learn`}
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course1?.CourseDetail[2]?.content,
                  }}
                />
              </div>
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  {` What you'll learn`}
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course2?.CourseDetail[2]?.content,
                  }}
                />
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Core Subjects
                </Alert>
                <DropDown subjects={courses?.course1?.CoreSubject} />
              </div>
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Core Subjects
                </Alert>
                <DropDown subjects={courses?.course2?.CoreSubject} />
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Major
                </Alert>
                <DropDown subjects={courses?.course1?.MajorCourse} />
              </div>
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  Major
                </Alert>
                <DropDown subjects={courses?.course2?.MajorCourse} />
              </div>
            </div>
            <hr className="my-5" />
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  CAREER OUTCOMES
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course1?.CourseDetail[3]?.content,
                  }}
                />
              </div>
              <div>
                <Alert className="rounded-none border-l-4 border-red-600 bg-red-600/10 font-extrabold tracking-wider text-red-400 uppercase">
                  CAREER OUTCOMES
                </Alert>
                <div
                  className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: courses?.course2?.CourseDetail[3]?.content,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Main>
      <Footer />
    </main>
  );
}

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

//@ts-ignore
export function DropDown({ subjects }) {
  return (
    <div className="w-full pt-5">
      <div className="mx-auto w-full bg-white p-2">
        {subjects?.map(({ name, content }, index) => (
          <Disclosure defaultOpen={index == 0 ? true : false} key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-red-100 px-4 py-2 text-left text-sm font-medium text-red-900 ">
                  <span>{name}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div
                    className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
