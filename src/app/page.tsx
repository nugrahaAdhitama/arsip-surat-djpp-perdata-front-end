"use client";
import Auth from "./auth/page";
import { getToken } from "@/utils/token";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

export default function Home() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={"Dashboard"} />

      {/* Main */}
      <Main
        active={"Dashboard"}
        description={"Kelola surat masuk dan surat keluar di sini."}
      ></Main>
    </main>
  );
}
