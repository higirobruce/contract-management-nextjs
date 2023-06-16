"use client";

import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Badge, Input, Table, Typography } from "antd";
import MyTable from "./table";
import Link from "next/link";
import { ArrowPathIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import FilesTable from "./filesTable";
import { useRouter } from "next/navigation";
const url = process.env.NEXT_PUBLIC_BKEND_URL;
const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;

export default function FilesList() {
  const user = JSON.parse(localStorage.getItem("user"));
  let [fileData, setFileData] = useState([]);

  function getData() {
    const res = fetch(`${url}/filings/my-filings/${user?._id}`, {
      cache: "no-store",
      headers:{
        organization: user?.organizations[0]?._id
      }
    })
      .then((res) => {
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error("Failed to fetch data");
        }

        return res.json();
      })
      .then((res) => {
        let d = res?.map((d) => {
          d.key = d._id;
          return d;
        });
        setFileData(d);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="z-0">
      <div className="flex flex-row justify-between items-center pl-3 pr-3 pb-3">
        <h1 className="font-bold">{fileData.length} Files </h1>
        <div className="flex flex-row items-center">
          <ArrowPathIcon
            className="h-5 w-5 text-gray-500 mr-4 cursor-pointer"
            onClick={() => getData()}
          />

          <div className="bg-blue-500 shadow-md px-2 py-1 rounded text-white cursor-pointer hover:bg-blue-600 hover:shadow-none">
            <Link
              href="/documents/files/new"
              className="flex flex-row items-center space-x-1"
            >
              <DocumentPlusIcon className="h-5 w-5" />{" "}
              <div className="text-xs">New File</div>
            </Link>
          </div>
        </div>
      </div>
      {/* <MyTabl e data={fileData} /> */}
      <FilesTable data={fileData} />
    </div>
  );
}
