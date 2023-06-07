'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutLink() {
  let router = useRouter();

  function logout() {
    localStorage.removeItem("user");
    router.push("/");
  }

  return (
    <div>
      <div
        className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white cursor-pointer"
        onClick={logout}
      >
        Logout
      </div>
    </div>
  );
}
