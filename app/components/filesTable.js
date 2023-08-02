"use client";
import { Input, Space, Table, Typography } from "antd";
import React, { useRef, useState } from "react";
import moment from "moment-timezone";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import Button from "./button";

export default function FilesTable({ data }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>

          <div
            onClick={() => clearFilters && handleReset(clearFilters)}
            className="text-sm text-blue-500 cursor-pointer"
          >
            Reset
          </div>

          <div
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
            className="text-sm text-blue-500 cursor-pointer"
          >
            Filter
          </div>

          <div
            onClick={() => {
              close();
            }}
            className="text-sm text-blue-500 cursor-pointer"
          >
            Close
          </div>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });
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
      ...getColumnSearchProps("number"),
    },
    {
      title: "NAME",
      dataIndex: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "ORGANIZATION",
      dataIndex: "organization",
      render: (_, record) => (
        <div
          scope="row"
          className=" font-light text-xs text-blue-500 whitespace-nowrap"
        >
          <Typography.Text> {record.organization?.name}</Typography.Text>
        </div>
      ),
      // ...getColumnSearchProps("description"),
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
