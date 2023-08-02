"use client";
import { Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import moment from "moment-timezone";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import Button from "./button";

export default function UsersTable({ data }) {
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
      title: "First Name",
      dataIndex: "firstName",
      render: (_, record) => (
        <div
          scope="row"
          className=" font-light text-xs text-blue-500 whitespace-nowrap hover:underline "
        >
          <Link href={`/users/` + record._id}> {record.firstName}</Link>
        </div>
      ),
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => a?.lastName?.localeCompare(b?.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a?.email?.localeCompare(b?.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Organization",
      dataIndex: "organization",
      render: (_, record) => (
        <div
          scope="row"
          className=" font-light text-xs text-blue-500 whitespace-nowrap hover:underline "
        >
          {record.organization}
        </div>
      ),
      sorter: (a, b) => a?.organization?.localeCompare(b?.organization),
      ...getColumnSearchProps("organization"),
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
