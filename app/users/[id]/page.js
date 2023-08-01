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
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Checkbox, Table, Tooltip } from "antd";
import moment from "moment-timezone";
import Link from "next/link";
import React, { useState } from "react";
import CommentSection from "../../components/commentsSection";
import { getUserDetails } from "../../components/getUserDetails";
import { updateUser } from "../../components/updateUser";

export default async function User({ params }) {
  let user = JSON.parse(localStorage.getItem("user"));
  let [edit, setEdit] = useState(true);

  let fData = await getUserDetails(params.id);

  function handleSetPermission(permission, value, module) {
    // console.log(`canView${module}`);
    updateUser(params.id, {
      [`permissions.can${permission + module}`]: value,
    });
  }

  return (
    <div className="flex flex-col px-36">
      <div className="flex flex-row justify-between">
        <Link
          className="flex flex-row items-center text-blue-500"
          href="/users"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <div className="text-xs">All Users</div>
        </Link>
      </div>
      {fData?.user && (
        <>
          <div className="my-12 flex flex-row justify-between">
            <div>
              <h1 className="flex flex-row items-center">
                {" "}
                <UserIcon className="h-10 w-10 text-gray-400" />
                {fData?.user?.firstName} {fData?.user?.lastName}
              </h1>
            </div>
          </div>
          {/* Card */}
          <div className="grid grid-cols-3 gap-y-10 rounded shadow-md ring-1 ring-gray-300 p-10 ">
            <div>
              <div className="text-gray-500 text-xxs">Organization</div>
              <div className="text-gray-800 text-sm">
                {fData?.user?.organizations[0]?.name}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Email</div>
              <div className="text-gray-800 text-sm">{fData?.user?.email}</div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Phone number</div>
              <div className="text-gray-800 text-sm">
                ({fData?.user?.phoneNumber?.countryCode}){" "}
                {fData?.user?.phoneNumber?.phone}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xxs">Status</div>
              <div className="text-gray-800 text-sm">{fData?.user?.status}</div>
            </div>
          </div>
          <div className="mt-5">
            <h3>Permissions</h3>
            <Table
              size="small"
              pagination={false}
              columns={[
                {
                  title: "Module",
                  key: 1,
                  dataIndex: "module",
                },
                {
                  title: "View",
                  key: 2,
                  render: (_, record) => {
                    return (
                      <Checkbox
                        // disabled={canNotEdit}
                        // checked={record?.view}
                        defaultChecked={record?.view}
                        onChange={(e) =>
                          handleSetPermission('View',e.target.checked, record?.alias)
                        }
                      />
                    );
                  },
                },
                {
                  title: "Edit",
                  key: 3,
                  render: (_, record) => {
                    return (
                      <Checkbox
                        // disabled={canNotEdit}
                        defaultChecked={record?.edit}
                        onChange={(e) =>
                          handleSetPermission('Edit',e.target.checked, record?.alias)
                        }
                      />
                    );
                  },
                },
                {
                  title: "Create",
                  key: 4,
                  render: (_, record) => {
                    return (
                      <Checkbox
                        // disabled={canNotEdit}

                        defaultChecked={record?.create}
                        onChange={(e) =>
                          handleSetPermission('Create',e.target.checked, record?.alias)
                        }
                      />
                    );
                  },
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  module: "All Files",
                  alias: "Files",
                  view: fData?.user?.permissions?.canViewFiles,
                  create: fData?.user?.permissions?.canCreateFiles,
                  edit: fData?.user?.permissions?.canEditFiles,
                  approve: fData?.user?.permissions?.canApproveFiles,
                },
                {
                  key: "2",
                  module: "Users",
                  alias: "Users",
                  view: fData?.user?.permissions?.canViewUsers,
                  create: fData?.user?.permissions?.canCreateUsers,
                  edit: fData?.user?.permissions?.canEditUsers,
                  approve: fData?.user?.permissions?.canApproveUsers,
                },
                {
                  key: "3",
                  module: "Master Data",
                  alias: "MasterData",
                  view: fData?.user?.permissions?.canViewMasterData,
                  create: fData?.user?.permissions?.canCreateMasterData,
                  edit: fData?.user?.permissions?.canEditMasterData,
                  approve: fData?.user?.permissions?.canApproveMasterData,
                },
              ]}
            />
          </div>
        </>
      )}
      {!fData?.user && (
        <div className="flex min-h-full items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <MagnifyingGlassIcon className="h-20 w-20 text-gray-300" />
            <div>The user you are looking for no loger exists!</div>
          </div>
        </div>
      )}
    </div>
  );
}
