import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export function CourseCard({ id, name, type, description }) {
  return (
    <Card className="mt-6 w-96 rounded-none">
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="uppercase font-extrabold tracking-wider line-clamp-1">
          {name}
        </Typography>
        <Typography variant="small" color="red" className="mb-2 text-[0.7rem] tracking-wider">
          {type}
        </Typography>
        <p className="line-clamp-4">{description}</p>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={`course/${id}`} className="text-xs text-red-600 font-bold uppercase">Overview</Link>
      </CardFooter>
    </Card>
  );
}
