"use client";
import Main from "../components/Main.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {
  Button,
  Navbar,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";



export default function Home() {
  return (
    <main>
      <Header />
      <Main>
        <CourseComparisonPage />
      </Main>
      <Footer />
    </main>
  );
}


const course1 = {
  name: "Bachelor of Computer Science",
  duration: "3 years",
  fee: "$10,000 per year",
  majors: ["Software Engineering", "Data Science", "Cybersecurity"],
  entryRequirements: ["Mathematics", "Computer Science fundamentals"]
};

const course2 = {
  name: "Bachelor of Business Administration",
  duration: "3 years",
  fee: "$12,000 per year",
  majors: ["Marketing", "Finance", "Human Resource Management"],
  entryRequirements: ["Business Studies", "Economics"]
};

const CourseComparisonPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Course Comparison</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={3} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overview</th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium">Duration</td>
            <td className="px-6 py-4 whitespace-nowrap">{course1.duration}</td>
            <td className="px-6 py-4 whitespace-nowrap">{course2.duration}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium">Fee</td>
            <td className="px-6 py-4 whitespace-nowrap">{course1.fee}</td>
            <td className="px-6 py-4 whitespace-nowrap">{course2.fee}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium">Majors</td>
            <td className="px-6 py-4 whitespace-nowrap">{course1.majors.join(', ')}</td>
            <td className="px-6 py-4 whitespace-nowrap">{course2.majors.join(', ')}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium">Entry Requirements</td>
            <td className="px-6 py-4 whitespace-nowrap">{course1.entryRequirements.join(', ')}</td>
            <td className="px-6 py-4 whitespace-nowrap">{course2.entryRequirements.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}