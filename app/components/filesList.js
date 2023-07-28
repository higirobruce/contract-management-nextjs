"use client";

import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Badge, Input, Table, Typography } from "antd";
import MyTable from "./table";
import Link from "next/link";
import {
  ArrowPathIcon,
  DocumentPlusIcon,
  ArrowDownTrayIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import FilesTable from "./filesTable";
import { useRouter } from "next/navigation";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DownloadOutlined, ArrowsAltOutlined } from "@ant-design/icons";

const url = process.env.NEXT_PUBLIC_BKEND_URL;
const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;

export default function FilesList() {
  const user = JSON.parse(localStorage.getItem("user"));
  let [fileData, setFileData] = useState([]);
  let [downloadingData, setDownloadingData] = useState(false);

  function download() {
    setDownloadingData(true);
    let _fileData = transformData(fileData);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
    exportToCSV(
      _fileData,
      `Files report ${moment().format("DD-MMM-YYYY HH-mm-ss")}`
    );

    setDownloadingData(false);
  }

  function transformData() {
    return fileData?.map((file) => {
      return {
        "File number": file?.number,
        "File name": file?.name,
        "File description": file?.description,
        "Contract value": file?.contractValue,
        "File Type": file?.agreementType?.description,
        "Party type": file?.partyType?.description,
        "Contract commencement": new Date(file?.contractCommencement),
        "Contract expiration": new Date(file?.contractExpiration),
        "Action on expiry": file?.actionOnExpiry?.description,
        "Status of execution": file?.statusOfExecution?.description,
        Owner: file?.owner?.lastName + " " + file?.owner?.firstName,
        "Owner email": file?.owner?.email,
        Organization: file?.organization?.name,
        Urgency: moment(file?.contractExpiration).isBefore(
          moment().add(1, "week")
        )
          ? "critical"
          : moment(file?.contractExpiration).isBefore(moment().add(1, "month"))
          ? "medium"
          : "low",
      };
    });
  }

  function getData() {
    fetch(`${url}/filings/my-filings/${user?._id}`, {
      cache: "no-store",
      headers: {
        organization: user?.organizations[0]?._id,
      },
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
          <div className="py-[4px] px-[5px] bg-gray-100 mr-4 rounded hover:bg-gray-200 hover:shadow">
            <ArrowPathIcon
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={() => getData()}
            />
          </div>

          <div className="py-[4px] px-[5px] bg-gray-100 mr-4 rounded hover:bg-gray-200 hover:shadow">
            {downloadingData && (
              <EllipsisHorizontalIcon
                className="h-4 w-4 text-gray-800 cursor-progress animate-pulse "
                // onClick={() => getData()}
              />
            )}
            {!downloadingData && (
              <ArrowDownTrayIcon
                className="h-4 w-4 text-gray-500 cursor-pointer"
                onClick={() => download()}
              />
            )}
          </div>

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
