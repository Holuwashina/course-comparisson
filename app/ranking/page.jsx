"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Bar, Line, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { Children, useEffect, useState } from "react";
import axios from "axios";
import { VerticalBarChart, PieChart } from "amazing-react-charts";
import { Spinner, Typography } from "@material-tailwind/react";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses/ranking");
        setRanking(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);


  if (ranking.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const courseData = ranking?.map((rank) => {
    return {
      name: rank?.course?.name,
      cost: rank?.cost,
      studentReviews: rank?.studentReviews,
      employmentOutcomes: rank?.employmentOutcomes,
      courseDuration: rank?.courseDuration,
      salaryRange: rank?.salaryRange,
    };
  });

  // Extract data for visualization
  const courseNames = courseData.map((course) => course.name.toUpperCase());
  const courseCosts = courseData.map((course) => ({
    name: course.name,
    value: course.cost,
  }));
  const studentReviews = courseData.map((course) => course.studentReviews);
  const employmentOutcomes = courseData.map(
    (course) => course.employmentOutcomes
  );
  const courseDuration = courseData.map((course) => course.courseDuration);

  console.log(courseNames);

  const costData = {
    labels: courseNames,
    datasets: [
      {
        label: "Course Costs",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: courseCosts,
      },
    ],
  };

  const studentReviewsData = {
    labels: courseNames,
    datasets: [
      {
        label: "Student Review",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: studentReviews,
      },
    ],
  };

  const employmentOutcomesData = {
    labels: courseNames,
    datasets: [
      {
        label: "Employment Outcomes",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: employmentOutcomes,
      },
    ],
  };

  const courseDurationData = {
    labels: courseNames,
    datasets: [
      {
        label: "Course Duration",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: courseDuration,
      },
    ],
  };

  return (
    <>
      <Header />
      <Main>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-8">
            <div>
              <Typography variant="h5" className="uppercase font-extrabold tracking-wider">
                Programmes Cost
              </Typography>
              <Typography>{`Dive into the intricate details of course costs at La Trobe University, unveiling a comprehensive overview of expenses associated with different academic programs. This visualization sheds light on the financial aspects of pursuing education at La Trobe, offering valuable insights into the investment required for each program and aiding prospective students in making informed decisions about their academic journey.`}</Typography>
            </div>{" "}
            <PieChart
              legendType="scroll"
              colors={["red", "yellow", "green", "blue"]}
              legendPosition="inside"
              radius="75%"
              toolboxTooltip={{ dataView: {title: "Breakdown"}, saveAsImageWithTitle: {title: "Save"} }}
              resultFormatType="percent"
              labelFontColor="black"
              tooltipTitle="title"
              center={["50%", "50%"]}
              data={courseCosts}
              titleFontSize={16}
            />
          </div>
          <hr />
        </div>
      </Main>
      <Footer />
    </>
  );
}

{
  /* <SalaryComponent ranking={ranking} /> */
}

{
  /* <RankingComponent title={"Course Cost"} ranking={ranking}> */
}

{
  /* <Bar data={costData} /> */
}
{
  /* </RankingComponent> */
}
// <RankingComponent title={"Student Review"} ranking={ranking}>
//   {/* <PolarArea data={studentReviewsData} /> */}
// </RankingComponent>
// <RankingComponent title={"Employment Outcomes"} ranking={ranking}>
//   {/* <Doughnut data={employmentOutcomesData} /> */}
// </RankingComponent>
// <RankingComponent title={"Course Duration"} ranking={ranking}>
//   {/* <Line data={courseDurationData} /> */}
// </RankingComponent>

function SalaryComponent({ ranking }) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-4">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {ranking.map((rank) => (
            <div
              key={rank.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-xs leading-7 text-gray-900">
                {rank?.course.name} estimated salary
              </dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                $ {rank?.salaryRange}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <hr />
    </div>
  );
}

function RankingComponent({ title, ranking, children }) {
  return (
    <>
      <hr />
      <h6 className="pl-2 pt-2 border-l-4 border-red-900 font-bold uppercase">
        {title}
      </h6>
      <ul role="list" className="divide-y divide-gray-100 pb-10">
        {ranking.map((rank) => (
          <>
            <li key={rank.name} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-bold leading-6 text-red-900 uppercase">
                    {rank?.course.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-red-900">
                    {rank.name}
                  </p>
                </div>
              </div>
              {title == "Course Cost" && (
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{rank.name}</p>
                  ${rank.cost}
                </div>
              )}
              {title == "Student Review" && (
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{rank.name}</p>
                  {rank.studentReviews}
                </div>
              )}
              {title == "Employment Outcomes" && (
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{rank.name}</p>
                  {rank.employmentOutcomes}
                </div>
              )}
              {title == "Course Duration" && (
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{rank.name}</p>
                  {rank.courseDuration}
                </div>
              )}
            </li>
          </>
        ))}
        {children}
      </ul>
    </>
  );
}
