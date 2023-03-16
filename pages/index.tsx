import { Inter } from "next/font/google";
import { Login } from "@/containers/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Login></Login>
    </>
  );
}
