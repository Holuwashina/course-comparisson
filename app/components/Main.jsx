"use client";
import { Navbar, Typography } from "@material-tailwind/react";


export default function Main({children}) {
  return (
    <div className="h-full">
      {children}
    </div>
  );
}
