'use client'
import { FileFilled } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import LogoutLink from "./logoutLink";


export default function Navbar({ user }) {
  let [viewMenu, setViewMenu] = useState(true);
  return (
    <nav className="flex items-center flex-wrap bg-blue-500 p-6 fixed top-0 left-0 right-0 z-10">
      <Link
        href="/"
        onClick={()=>setViewMenu(!viewMenu)}
        className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer"
      >
        {/* <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>

        {/* <span className="font-semibold text-xl tracking-tight">
          Contract Management System
        </span> */}
      </Link>
      <div className="block lg:hidden">
        <button
          onClick={()=>setViewMenu(!viewMenu)}
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {viewMenu && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              href="/documents/files"
              onClick={()=>setViewMenu(!viewMenu)}
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >
              Files
            </Link>
            <Link
              href="/documents/legal-templates"
              onClick={()=>setViewMenu(!viewMenu)}
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >
              Legal templates
            </Link>

            <Link
              href="/documents/matters-arising"
              onClick={()=>setViewMenu(!viewMenu)}
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >
              Matters arising
            </Link>

            {user && user?.permissions?.canViewUsers && <Link
              href="/users"
              onClick={()=>setViewMenu(!viewMenu)}
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
            >
              Users
            </Link>}
          </div>
          <div className="flex flex-row space-x-5 text-sm">
            {user && (
              <div className="flex flex-row space-x-5 ">
                <Link
                  href="/profile"
                  onClick={()=>setViewMenu(!viewMenu)}
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
                >
                  Hi, {user?.firstName}
                </Link>

                <LogoutLink />
              </div>
            )}

            {!user && (
              <Link
                href="/"
                onClick={()=>setViewMenu(!viewMenu)}
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
