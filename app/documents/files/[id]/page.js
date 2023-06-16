"use client";

import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  CloudArrowUpIcon,
  DocumentArrowUpIcon,
  DocumentMagnifyingGlassIcon,
  PaperAirplaneIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import moment from "moment-timezone";
import Link from "next/link";
import React from "react";
import CommentSection from "../../../components/commentsSection";
import { getFileDetails } from "../../../components/getFileDetails";

export default async function File({ params }) {
  let user = JSON.parse(localStorage.getItem("user"));

  let fData = await getFileDetails(params.id);

  return (
    <div className="flex flex-col px-36">
      <div className="flex flex-row justify-between">
        <Link
          className="flex flex-row items-center text-blue-500"
          href="/documents/files"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <div className="text-xs">All files</div>
        </Link>

        {fData && (
          <div className="flex flex-row space-x-5">
            <Tooltip title={<div className="text-xxs">Upload new Version</div>}>
              <DocumentArrowUpIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
            </Tooltip>
            <Tooltip title={<div className="text-xxs">Edit Metadata</div>}>
              <PencilSquareIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
            </Tooltip>

            <Tooltip title={<div className="text-xxs">Archive</div>}>
              <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer" />
            </Tooltip>
          </div>
        )}
      </div>
      {fData && (
        <>
          <div className="my-12 flex flex-row justify-between">
            <div>
              <h1>File name: {fData?.name}</h1>
              <h3 className="text-gray-400 text-xxs">{fData?.description}</h3>
            </div>

            <div>
              <Link
                href={fData.docId}
                target="_blank"
                className="text-xs text-blue-500 cursor-pointer hover:underline hover:text-blue-400"
              >
                {fData.docId}
              </Link>
            </div>
          </div>
          {/* Card */}
          <div className="grid grid-cols-3 gap-y-10 rounded shadow-md ring-1 ring-gray-300 p-10 ">
            <div>
              <div className="text-gray-500 text-xxs">Party type</div>
              <div className="text-gray-800 text-sm">
                {fData?.partyType?.description}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Agreement type</div>
              <div className="text-gray-800 text-sm">
                {fData?.agreementType?.description}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Status of execution</div>
              <div className="text-gray-800 text-sm">
                {fData?.statusOfExecution?.description}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Contract value</div>
              <div className="text-gray-800 text-sm">
                {fData?.contractValue.toLocaleString()} Rwf
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Comments</div>
              <div className="text-gray-800 text-sm">{fData?.comments}</div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">
                Required action (upon expiry)
              </div>
              <div className="text-gray-800 text-sm">
                {fData?.actionOnExpiry.description}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Commencement date</div>
              <div className="text-gray-800 text-sm">
                {moment(fData?.contractCommencement).format("YYYY-MMM-DD")}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Expiration date</div>
              <div className="text-gray-800 text-sm flex flex-row">
                <div>
                  {moment(fData?.contractExpiration).format("YYYY-MMM-DD")}
                </div>
                <div className="text-xxs text-gray-500 ml-2 font-light">({moment(fData?.contractExpiration).fromNow()})</div>
              </div>
            </div>

            <div className="">
              <div className="text-gray-500 text-xxs mb-2">Collaborators</div>
              {fData?.collaborators?.map((collab, index) => {
                return (
                  <div>
                    <div className="flex flex-row items-center mb-2 text-gray-500 space-x-5">
                      <div className="w-10 h-10 text-xxs rounded-full items-center justify-center flex bg-yellow-100 p-1">
                        {collab?.firstName?.toUpperCase()?.substring(0, 1)}
                        {collab?.lastName?.toUpperCase()?.substring(0, 1)}
                      </div>
                      <div>
                        <div className="text-xxs text-gray-800">
                          {collab?.firstName} {collab?.lastName}
                        </div>
                        <div className="text-xxs">{collab?.email}</div>
                      </div>
                    </div>
                    {index < fData?.collaborators?.length - 1 && (
                      <div className="bg-gray-200 h-[1px] w-2/3 mb-3"></div>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <div className="text-gray-500 text-xxs">
                Company
              </div>
              <div className="text-gray-800 text-sm">
                {fData?.organization?.name}
              </div>
            </div>
          </div>

          <CommentSection parentObject={fData} collaborator={user} />
        </>
      )}
      {!fData && (
        <div className="flex min-h-full items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <DocumentMagnifyingGlassIcon className="h-20 w-20 text-gray-300" />
            <div>The file you are looking for no loger exists!</div>
          </div>
        </div>
      )}
    </div>
  );
}
