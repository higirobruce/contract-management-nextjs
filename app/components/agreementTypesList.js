"use client";

const url = process.env.NEXT_PUBLIC_BKEND_URL;
const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;


export async function getAgreementTypes() {
  const res = await fetch(`${url}/agreementTypes`, {
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
