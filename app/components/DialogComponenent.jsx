import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Link from "next/link";

export default function DialogComponenent({ filteredData, open, handleOpen }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-sm text-red-900 p-2">{filteredData.length} result(s) found</p>
        </DialogHeader>
        <DialogBody>
          {filteredData.map((data) => {
            return (
              <Fragment key={data.id}>
                <div className="p-2">
                  <h1 className="font-semibold text-black">{data.name}</h1>
                  <p>{data.description}</p>
                  <Link className="text-xs text-red-900" href={`course/${data.id}`}>Read more</Link>
                </div>
                <hr />
              </Fragment>
            );
          })}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
