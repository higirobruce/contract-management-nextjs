import { Inter, Roboto, Lato } from "next/font/google";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/protectedRoute";

const inter = Lato({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "CVL-Contract Management System",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*  */}
      <body className={inter.className}>
        <ProtectedRoute children={children} />
      </body>
    </html>
  );
}
