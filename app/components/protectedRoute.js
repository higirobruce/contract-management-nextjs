"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function ProtectedRoute({ children }) {
  let router = useRouter();
  let [user, setUser] = useState('')
  useEffect(()=>{
    let _user = localStorage.getItem("user");
    if(_user?.length>0 && _user!=='undefined'){
        console.log(_user)
        setUser(JSON.parse(_user))
    } else {
        setUser(null)
    }
  },[])
  return (
    <main>
      <Navbar user={user} />
      {user && (
        <div className="flex min-h-screen flex-col p-16 md:mt-10 space-y-5">
          {children}
        </div>
      )}
      {!user && <div className="flex min-h-screen items-center justify-center flex-col p-16 md:mt-10 space-y-5">
            <div>Not authorized to access this area.</div>
            <Link href='/' className="text-sm text-blue-500 bg-white py-1 px-3 rounded shadow-md">Take me to Login page</Link>
        </div>}
    </main>
  );
}
