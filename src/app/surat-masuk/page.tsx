"use client";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import ListTableData from "./components/ListTableData";

function Home() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      <Sidebar active={"Surat Masuk"} />

      <Main active={"Surat Masuk"} description={"Kelola Surat Masuk di sini"}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-full h-full no-scrollbar scrollbar-hide">
          <ListTableData />
        </div>
      </Main>
    </main>
  );
}

export default Home;