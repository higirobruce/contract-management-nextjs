import { Badge } from "antd";
import moment from "moment-timezone";
import Link from "next/link";
import React from "react";

export default function MyTable({ data }) {
  return (
    <div className="relative overflow-x-auto table-auto h-[510px] rounded shadow ring-1 ring-gray-200">
      <table className="w-full text-sm text-left text-gray-500 rounded shadow ring-1 ring-gray-200 dark:text-gray-400 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky">
          <tr>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Urgency
            </th>
            <th scope="col" className="px-6 py-3">
              Expires
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-xs text-blue-500 whitespace-nowrap hover:underline "
                >
                  <Link href={`/documents/files/` + d._id}> {d.number}</Link>
                </th>
                <td className="px-6 py-4 font-light text-xs">{d.name}</td>
                <td className="px-6 py-4 font-light text-xs">{d.description}</td>
                <td className="px-6 py-4 font-light text-xs">
                  {moment(d?.contractExpiration).isBefore(
                    moment().add(1, "week")
                  ) ? (
                    <span className="bg-red-100 text-red-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">critical</span>

                  ) : moment(d?.contractExpiration).isBefore(
                      moment().add(1, "month")
                    ) ? (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">medium</span>

                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">low</span>

                  )}
                </td>

                <td className="px-6 py-4 font-light text-xs">
                  {moment(d?.contractExpiration).isBefore(
                    moment().add(1, "week")
                  ) ? (
                    <span className="bg-red-100 text-red-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{moment(d?.contractExpiration).fromNow()}</span>

                  ) : moment(d?.contractExpiration).isBefore(
                      moment().add(1, "month")
                    ) ? (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{moment(d?.contractExpiration).fromNow()}</span>

                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-light mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{moment(d?.contractExpiration).fromNow()}</span>

                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
