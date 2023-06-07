"use client";

import React from "react";
import moment from "moment-timezone";
import { Badge, Table, Typography } from "antd";
import MyTable from "./table";
const url = process.env.NEXT_PUBLIC_BKEND_URL;
const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;


export async function getPartyTypes() {
  const res = await fetch(`${url}/partyTypes`, {
    // headers: {
    //   Authorization: "Basic " + `${baseAuth}`,
    //   "Content-Type": "application/json",
    // },
  })
  
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
