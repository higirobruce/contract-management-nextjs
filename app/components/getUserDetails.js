"use client";

const url = process.env.NEXT_PUBLIC_BKEND_URL;
const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;


export async function getUserDetails(id) {
  const res = await fetch(`${url}/users/byId/${id}`, {
    // headers: {
    //   Authorization: "Basic " + `${baseAuth}`,
    //   "Content-Type": "application/json",
    // },
  })
  
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(id)
    return null
    // throw new Error("Failed to fetch data");
  }

  return res.json();
}
