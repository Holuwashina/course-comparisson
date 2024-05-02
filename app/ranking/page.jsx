"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Chart from "chart.js/auto";
import { Bar, Radar, Pie } from "react-chartjs-2";
import { useState } from "react";

const dummyCourseData = [
  { name: "Computer Science", cost: 20000 },
  { name: "Cybersecurity", cost: 22000 },
  { name: "Information Technology", cost: 18000 },
  { name: "Data Science", cost: 25000 },
  { name: "Software Engineering", cost: 23000 },
];

export default function Ranking() {
  //const [courseData, setCourseData] = useState(dummyCourseData);

  // Dummy course data
  const dummyCourseData = [
    {
      name: "Bachelor of Computer Science",
      cost: 20000,
      studentReviews: 4.5,
      employmentOutcomes: 85,
    },
    {
      name: "Bachelor of Cybersecurity",
      cost: 25000,
      studentReviews: 4.2,
      employmentOutcomes: 80,
    },
    {
      name: "Bachelor of Information Technology",
      cost: 18000,
      studentReviews: 4.7,
      employmentOutcomes: 90,
    },
  ];

  // Extract data for visualization
  const courseNames = dummyCourseData.map((course) => course.name);
  const courseCosts = dummyCourseData.map((course) => course.cost);
  const studentReviews = dummyCourseData.map((course) => course.studentReviews);
  const employmentOutcomes = dummyCourseData.map(
    (course) => course.employmentOutcomes
  );

  // Define data for the bar chart
  const barChartData = {
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
      {
        label: "Student Reviews",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: studentReviews,
      },
    ],
  };

  // Define data for the radar chart
  const radarChartData = {
    labels: courseNames,
    datasets: [
      {
        label: "Employment Outcomes",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 206, 86, 1)",
        data: employmentOutcomes,
      },
    ],
  };

  return (
    <>
      <Header />

      <Main>
        <div className="container mx-auto px-4 py-8">
          <div>
            <CourseVisualizations />
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

const CourseVisualizations = () => {
  // Dummy data for courses
  const courseData = [
    {
      name: "Bachelor of Computer Science",
      cost: 20000,
      employabilityMetrics: {
        employmentRates: 85,
        employerSatisfaction: 4.6,
      },
      academicPerformance: {
        academicReputation: 4.8,
      },
    },
    {
      name: "Bachelor of Cybersecurity",
      cost: 22000,
      employabilityMetrics: {
        employmentRates: 80,
        employerSatisfaction: 4.5,
      },
      academicPerformance: {
        academicReputation: 4.7,
      },
    },
    {
      name: "Bachelor of Information Technology",
      cost: 18000,
      employabilityMetrics: {
        employmentRates: 90,
        employerSatisfaction: 4.8,
      },
      academicPerformance: {
        academicReputation: 4.9,
      },
    },
    // Add more courses here...
  ];

  // Extract data for visualization
  const courseNames = courseData.map((course) => course.name);
  const courseCosts = courseData.map((course) => course.cost);
  const employmentRates = courseData.map(
    (course) => course.employabilityMetrics.employmentRates
  );
  const academicReputations = courseData.map(
    (course) => course.academicPerformance.academicReputation
  );
  const employerSatisfactions = courseData.map(
    (course) => course.employabilityMetrics.employerSatisfaction
  );

  // Define data for the bar chart (Course Cost Comparison)
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

  // Define data for the radar chart (Employment Rates Comparison)
  const employmentData = {
    labels: courseNames,
    datasets: [
      {
        label: "Employment Rates",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        data: employmentRates,
      },
    ],
  };

  // Define data for the radar chart (Academic Performance Comparison)
  const academicData = {
    labels: courseNames,
    datasets: [
      {
        label: "Academic Reputation",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        data: academicReputations,
      },
    ],
  };

  // Define data for the pie chart (Employer Satisfaction Comparison)
  const satisfactionData = {
    labels: courseNames,
    datasets: [
      {
        label: "Employer Satisfaction",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
        data: employerSatisfactions,
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-center gap-4">
        <div>
          <h2 className="font-bold uppercase">Course Costs</h2>
          <Bar data={costData} />
        </div>
        
      </div>
      <hr className="py-4" />
      <div className="grid grid-cols-2 justify-center gap-4">
        <div>
          <h2 className="font-bold uppercase">Employment Rates</h2>
          <Radar data={employmentData} />
        </div>
        
      </div>
      <hr className="py-4" />
      <div className="grid grid-cols-2 justify-center gap-4">
        <div>
          <h2 className="font-bold uppercase">Academic Performance</h2>
          <Radar data={academicData} />
        </div>

      </div>
      <hr className="py-4" />
      <div className="grid grid-cols-2 justify-center gap-4">
        <div>
          <h2 className="font-bold uppercase">Academic Performance</h2>
          <Pie data={satisfactionData} />
        </div>
      </div>
    </>
  );
};
