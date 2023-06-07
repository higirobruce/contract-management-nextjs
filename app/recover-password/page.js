"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRouter as useNextRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/button";
import TextField from "../components/textField";

const url = process.env.NEXT_PUBLIC_BKEND_URL;
export default function ResetPassword() {
  let router = useRouter();
  let [email, setEmail] = useState("");
  let [submiting, setSubmitting] = useState(false);

  useEffect(() => {
    setSubmitting(false);
  }, []);
  async function resetPassword() {
    setSubmitting(true);
    fetch(`${url}/users/recoverPassword/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   token,
      //   newPassword: password,
      // }),
    })
      .then((res) => {
        if (res.ok) {
          // setLoggingIn(false);
          return res.json();
        } else {
          // setLoggingIn(false);
          // throw new Error('Failed to Fetch')
        }
      })
      .then((res) => {
        if (res) {
          router.push("/");
          // setLoggingIn(false);
        }
      })
      .catch((err) => {})
      .finally(() => setSubmitting(false));
  }

  return (
    <main className="grid h-screen place-items-center">
      <div className="w-1/3 flex flex-col space-y-20">
        <div className="flex flex-col items-center justify-center  space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 text-blue-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
          <div className="text-xl">Recover your password</div>
        </div>
        <div className="flex flex-col shadow rounded px-5 py-20 bg-white ">
        <div className="flex flex-col space-x-1">
            <h1 className="text-md">Provide your email</h1>
          </div>
          <div className="mt-5 flex flex-col space-y-5 w-full">
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setEmail(e)}
            />

            <div className="flex flex-row justify-between items-center pt-5">
              <div className="">
                {submiting && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {!submiting && (
                  <div className="w-full">
                    <Button
                      onClick={resetPassword}
                      isDisabled={!email || submiting}
                    >
                      Reset
                    </Button>
                  </div>
                )}
              </div>
              <Link className="text-xs text-blue-500 hover:underline" href="/">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
