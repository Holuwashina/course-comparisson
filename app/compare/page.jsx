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
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";

function ComparisonPage() {
  const searchParams = useSearchParams();
  const c1 = searchParams.get("c1");
  const c2 = searchParams.get("c2");

  const [courses, setCourses] = useState(null);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState({
    course1: c1,
    course2: c2,
  });

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

  console.log(courses);

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

  if (!courses.comparison) return;

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
            <div className="md:flex items-center gap-2 pt-8">
              <div className="w-96 p-2">
                <Select
                  value={selectedCourses.course1}
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
              <div>
                <Typography className="p-2" color="white">
                  with
                </Typography>
              </div>
              <div className="w-96 p-2">
                <Select
                  value={selectedCourses.course2}
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
                color="white"
                variant="outlined"
                onClick={handleSubmit}
                size="lg"
                className="text-xs"
              >
                {loading ? "loading..." : "Compare"}
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
          <div className="px-8 xl:px-40 mt-[-10%] overflow-x-auto">
            <ComparisonTable data={courses?.comparison} />
          </div>
        )}
      </Main>
      <Footer />
    </main>
  );
}

// Wrap the component with Suspense and provide a fallback
const ComparePageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ComparisonPage />
  </Suspense>
);

export default ComparePageWithSuspense;


const ComparisonTable = ({ data }) => {
  return (
    <table className="table-fixed min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {data?.map((course, index) => (
            <th
              key={index}
              className="w-1/2 align-baseline px-6 py-3 font-normal text-left text-gray-500"
            >
              <Card className="mt-6 shadow-none border rounded-none border-red-600 mb-4">
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 font-extrabold uppercase"
                  >
                    {course?.name}
                  </Typography>
                  <p className="line-clamp-3">{course?.description}</p>
                </CardBody>
                <CardFooter className="pt-0">
                  <a
                    href={`/course/${course?.id}`}
                    className="text-red-600 text-xs uppercase font-semibold tracking-wider"
                  >
                    Read More
                  </a>
                </CardFooter>
              </Card>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {/* Overview */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Overview
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.Overview?.map((overview) => {
                      const entries = Object.entries(overview);
                      return entries.map(([key, value]) => {
                        console.log(key, value);
                        return (
                          <tr key={key}>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {formatFieldName(key)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {value}
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>
        {/* Pathway */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Pathway
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.Pathway?.map((pathway, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <h6 className="text-sm font-bold text-red-600 pb-1 tracking-wide uppercase">
                              {`${pathway.overview}`}
                            </h6>
                            <p className="text-sm font-medium text-gray-900">
                              {`${pathway.description}`}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>

        {/* Major Structure */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Major Structure
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.MajorCourse.length == 0 ? (
                      <tr>
                        <td className="px-6 py-4">
                        <h6 className="text-sm font-bold text-red-600 pb-1 tracking-wide">
                            No major for this course
                          </h6>
                        </td>
                      </tr>
                    ) : (
                      course?.MajorCourse?.map((major, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4">
                              <h6 className="text-sm font-bold text-red-600 pb-1 tracking-wide">
                                <a href={`${major.link}`}>{`${major.name}`}</a>
                              </h6>
                              <p className="text-sm font-medium text-gray-900">
                                {`${major.code}`}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>

        {/* Major Structure */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Core Subjects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.CoreSubject.length == 0 ? (
                      <tr>
                        <td className="px-6 py-4">
                        <h6 className="text-sm font-bold text-red-600 pb-1 tracking-wide">
                            No core subject(s) for this course
                          </h6>
                        </td>
                      </tr>
                    ) : (
                      course?.CoreSubject?.map((subject, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4">
                              <h6 className="text-sm font-bold text-red-600 pb-1 tracking-wide">
                                <a href={`${subject.link}`}>{`${subject.name}`}</a>
                              </h6>
                              <p className="text-sm font-medium text-gray-900">
                                {`${subject.code}`}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>

        {/* LearningOutcome */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Learning Outcomes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.LearningOutcome?.map((outcome, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <p className="text-sm pb-1 tracking-wide line-clamp-2">
                              {`${outcome.overview}`}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>

        {/* Career Opportunity */}

        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Career Opportunities
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.CareerOpportunity?.map((career, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <p className="text-sm text-red-600 font-bold pb-1 tracking-wide line-clamp-2">
                              {`${career.overview}`}
                            </p>
                            <p className="text-sm pb-1 tracking-wide line-clamp-2">
                              {`${career.description}`}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>

        {/* Professional Recognition */}
        <tr>
          {data?.map((course, index) => {
            return (
              <td className="w-1/2 align-baseline" key={index}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        colSpan={2}
                        className="px-6 py-3 text-left text-xs font-bold bg-red-900 text-gray-100 uppercase tracking-wider"
                      >
                        Professional Recognition
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course?.ProfessionalRecognition?.map(
                      (recognition, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4">
                              <p className="text-sm pb-1 tracking-wide">
                                {`${recognition.overview}`}
                              </p>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

function formatFieldName(str) {
  // Replace all capital letters preceded by lowercase letters with a space and the capital letter
  const formattedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Capitalize the first letter of each word
  return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
}




import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

// @ts-ignore
// export function DropDown({ subjects }) {
//   return (
//     <div className="w-full pt-5">
//       <div className="mx-auto w-full bg-white p-2">
//         {subjects?.map(({ name, content }, index) => (
//           <Disclosure defaultOpen={index == 0 ? true : false} key={index}>
//             {({ open }) => (
//               <>
//                 <Disclosure.Button className="flex w-full justify-between bg-red-100 px-4 py-2 text-left text-sm font-medium text-red-900 ">
//                   <span>{name}</span>
//                   <ChevronUpIcon
//                     className={`${
//                       open ? "rotate-180 transform" : ""
//                     } h-5 w-5 text-purple-500`}
//                   />
//                 </Disclosure.Button>
//                 <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
//                   <div
//                     className="prose prose-headings:uppercase prose-headings:max-w-md prose-headings:font-extrabold prose-a:text-red-600 max-w-none"
//                     dangerouslySetInnerHTML={{
//                       __html: content,
//                     }}
//                   />
//                 </Disclosure.Panel>
//               </>
//             )}
//           </Disclosure>
//         ))}
//       </div>
//     </div>
//   );
// }
