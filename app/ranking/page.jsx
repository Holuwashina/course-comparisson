"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Bar, Line, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { Children, useEffect, useState } from "react";
import axios from "axios";
import {
  DonutChart,
  HorizontalBarChart,
  PieChart,
  VerticalBarChart,
} from "amazing-react-charts";
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

  if (!ranking  || ranking?.length === 0) {
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
              <Typography
                variant="h5"
                className="uppercase font-extrabold tracking-wider"
              >
                Programmes Cost
              </Typography>
              <Typography>{`Dive into the intricate details of course costs at La Trobe University, unveiling a comprehensive overview of expenses associated with different academic programs. This visualization sheds light on the financial aspects of pursuing education at La Trobe, offering valuable insights into the investment required for each program and aiding prospective students in making informed decisions about their academic journey.`}</Typography>
            </div>{" "}
            <PieChart
              legendType="scroll"
              colors={["red", "yellow", "green", "blue"]}
              legendPosition="inside"
              radius="75%"
              toolboxTooltip={{
                saveAsImageWithTitle: { title: "Save" },
              }}
              resultFormatType="percent"
              labelFontColor="black"
              tooltipTitle="title"
              center={["50%", "50%"]}
              data={courseCosts}
              titleFontSize={16}
            />
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-8">
            <div>
              <Typography
                variant="h5"
                className="uppercase font-extrabold tracking-wider"
              >
                Programme Duration
              </Typography>
              <Typography>{`Explore the comprehensive timeline of project durations at La Trobe University, providing a detailed overview of the timeframes associated with various academic projects. This visualization illuminates the temporal aspects of undertaking these projects, offering valuable insights into the commitment required for each endeavor.By understanding the duration of different projects, prospective students can make informed decisions about their academic planning and time management, ensuring a well-structured and successful educational journey.`}</Typography>
            </div>{" "}
            <HorizontalBarChart
              toolboxTooltip={{
                saveAsImageWithTitle: { title: "Save" },
              }}
              boldTickLabel
              showTickInfos
              marginLeftTitle="50%"
              xType="yaer"
              onClickBar={(item) => window.alert(item.data.value)}
              tooltip={{
                label: "Duration",
                result: "Years",
              }}
              data={[
                {
                  label: "Computer science",
                  result: 4,
                  style: { color: "red" },
                  itemId: "Com Sci",
                },
                {
                  label: "Cyber Security",
                  result: 4,
                  style: { color: "yellow" },
                  itemId: "Cyber",
                },
                {
                  label: "Information Technology",
                  result: 3,
                  style: { color: "green" },
                  itemId: "Info Tech",
                },
              ]}
            />
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-8">
            <div>
              <Typography
                variant="h5"
                className="uppercase font-extrabold tracking-wider"
              >
                Programme Selection Rate
              </Typography>
              <Typography>{`Explore the competitive landscape of admissions at La Trobe University, delving into the detailed selection rates across various academic programs. This analysis provides a clear picture of the acceptance rates, highlighting the level of competition prospective students may face. Gain valuable insights into the likelihood of securing a spot in your desired program, aiding you in making informed decisions about your academic pursuits and application strategies.`}</Typography>
            </div>{" "}
            <DonutChart
              toolboxTooltip={{
                saveAsImageWithTitle: { title: "Save" },
              }}
              colors={["red", "orange", "yellow", "green"]}
              legendPosition="outside"
              resultFormatType="percent"
              center={["50%", "50%"]}
              donutRadius={["58%", "70%"]}
              tooltip={{
                label: "Programme",
                result: "Selection rate",
              }}
              data={[
                { name: "Computer Science", value: 61.75 },
                { name: "Information Technology", value: 56 },
                { name: "Cyber Security", value: 60.2 },
              ]}
            />
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-8">
            <div>
              <Typography
                variant="h5"
                className="uppercase font-extrabold tracking-wider"
              >
                Average Salary Range
              </Typography>
              <Typography>
                {`Discover the potential earnings for graduates from La Trobe University with our detailed exploration of expected salary ranges across various academic programs. This visualization provides a thorough analysis of salary expectations, giving prospective students valuable insights into the financial returns of their educational investments. By highlighting the average salaries associated with different fields of study, this guide helps students make informed decisions about their future careers and the economic benefits of their chosen programs.`}
              </Typography>
            </div>{" "}
            <VerticalBarChart
              toolboxTooltip={{
                saveAsImageWithTitle: { title: "Save" },
              }}
              showBarLabel
              yComplement={(value) => `$ ${value},00`}
              xType="category"
              yType="value"
              color="green"
              tooltip={{ label: "Programme", result: "Salary range yearly" }}
              data={[
                {
                  label: "Computer Science",
                  result: "30000",
                },
                {
                  label: "Information Technology",
                  result: "15000",
                },
                {
                  label: "Cyber Security",
                  result: "27000",
                },
              ]}
            />
          </div>
          <hr />
        </div>
      </Main>
      <Footer />
    </>
  );
}
