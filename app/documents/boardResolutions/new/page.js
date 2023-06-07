import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default function NewFile() {
  return (
    <div className="flex flex-row items-center space-x-2">
        <Link href='/documents/boardResolutions'>
          <ArrowLeftIcon className="h-4 w-4 cursor-pointer" />
        </Link>
        <h1>Create a new board resolution</h1>
      </div>
  );
}
