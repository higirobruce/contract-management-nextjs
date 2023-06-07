"use client";
import { Table } from "antd";
import React from "react";
import moment from "moment-timezone";
import Link from "next/link";

export default function FilesTable({ data }) {
  let columns = [
    {
      title: "NUMBER",
      dataIndex: "number",
      render: (_, record) => (
        <div
          scope="row"
          className=" font-light text-xs text-blue-500 whitespace-nowrap hover:underline "
        >
          <Link href={`/documents/files/` + record._id}> {record.number}</Link>
        </div>
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
    },
    {
      title: "URGENCY",
      // dataIndex:'name',
      filters: [
        {
          text: "Critical",
          value: moment().add(1, "week"),
        },
        {
          text: "Medium",
          value: moment().add(1, "month"),
        },
        {
          text: "Low",
          value: 1,
        },
      ],
    //   filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        value == 1
          ? moment(record?.contractExpiration).isAfter(moment().add(1, "month"))
          : moment(record?.contractExpiration).isBefore(value),
      render: (_, record) => (
        <>
          {moment(record?.contractExpiration).isBefore(
            moment().add(1, "week")
          ) ? (
            <span className="bg-red-100 text-red-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              critical
            </span>
          ) : moment(record?.contractExpiration).isBefore(
              moment().add(1, "month")
            ) ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
              medium
            </span>
          ) : (
            <span className="bg-green-100 text-green-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              low
            </span>
          )}
        </>
      ),
    },

    {
      title: "EXPIRES",
      // dataIndex:'name',
      render: (_, record) => (
        <>
          <div className="text-xs text-gray-400">
            {moment(record?.contractExpiration).fromNow()}
          </div>
        </>
      ),
    },
  ];
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 15,
      }}
      // scroll={{
      //   y: 240,
      // }}
    />
  );
}
