import React from "react";
import { FolderPlusIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Files() {
  return (
    <>
      <div className="flex flex-row justify-between items-center pl-3 pr-3">
        <h1 className="font-bold">Board Resolutions</h1>
        <div>
          <div className="bg-blue-50 p-2 rounded text-gray-500 cursor-pointer">
            <Link href="/documents/boardResolutions/new">
              <FolderPlusIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
