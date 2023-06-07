"use client";

import { DatePicker } from "antd";
import React from "react";

export default function Datepicker({ setStartDate, setEndDate }) {
  return (
    <div>
      <div className="text-xs mb-1">Select start and end dates</div>
      <DatePicker.RangePicker
        onChange={(values) => {
          setStartDate(values[0]);
          setEndDate(values[1]);
        }}
      />
    </div>
  );
}
