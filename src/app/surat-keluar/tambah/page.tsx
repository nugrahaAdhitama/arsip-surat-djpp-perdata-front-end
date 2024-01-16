"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import FormSuratKeluar from "@/app/surat-keluar/components/FormSuratKeluar";

export default function Tambah() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      <Sidebar active={"Surat Keluar"} />

      <Main
        active={"Surat Keluar"}
        description={"Tambah data surat keluar di sini"}
      >
        <FormSuratKeluar />
      </Main>
    </main>
  );
}
