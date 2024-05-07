"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Rating } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const features = [
  {
    name: "Course Selection.",
    description:
      "Users can select the course they want to review from a dropdown menu populated with available courses.",
    icon: CloudArrowUpIcon,
  },
  {
    name: " Review Form.",
    description:
      "The review form includes fields for users to rate different aspects of the course",
    icon: LockClosedIcon,
  },
  {
    name: "Submission.",
    description:
      "Once users have completed the review form, they can submit their review for the selected course, the app validates the review data to ensure completeness and accuracy before accepting the submission.",
    icon: ServerIcon,
  },
];

export default function Review() {
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

  console.log(courses);

  return (
    <>
      <Header />

      <Main>
        <div className="container mx-auto px-4 py-8">
          <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-red-900">
                      Let hear your opinion
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Write a review
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      {`To provide valuable insights to users, our Course Comparison App allows students to share their experiences and opinions about specific course.`}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                      {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <feature.icon
                              className="absolute left-1 top-1 h-5 w-5 text-red-900"
                              aria-hidden="true"
                            />
                            {feature.name}
                          </dt>{" "}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div
                  className="bg-red-900 p-4 rounded-md
                "
                >
                  <form>
                    <div className="space-y-12">
                      <div className="border-b border-white-100/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Email
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                  latrobe.com/
                                </span>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  autoComplete="email"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="janesmith@gmail.com"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="course"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Course
                            </label>
                            <div className="mt-2">
                              <select
                                id="course"
                                name="course"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                {courses?.length > 0 ? (
                                  courses?.map(({ name, id }, index) => (
                                    <option key={index} value={id}>
                                      {name}
                                    </option>
                                  ))
                                ) : (
                                  <option>Loading...</option>
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Rate the course
                            </label>
                            <Rating value={4} />
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Review
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                              />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-white">
                              Write a few review about the course.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
