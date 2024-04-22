import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export function CourseCard({ id, title, type, description }) {
  return (
    <Card className="mt-6 w-96 rounded-none">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="uppercase">
          {title}
        </Typography>
        <Typography variant="small" color="red" className="mb-2 text-[0.6rem]">
          {type}
        </Typography>
        <p className="line-clamp-4">{description}</p>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={`course/${id}`}>Overview</Link>
      </CardFooter>
    </Card>
  );
}
