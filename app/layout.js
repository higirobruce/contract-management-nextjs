import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CVL-Contract Management System",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*  */}
      <body className={`${inter.className}`}>
      {children}
      </body>
    </html>
  );
}
