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
        <Typography variant="h5" className="text-italic text-center"> Page in progress </Typography>
      </Main>
      <Footer />
    </main>
  );
}
