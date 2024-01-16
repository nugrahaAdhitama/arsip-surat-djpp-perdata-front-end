"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import FormSuratMasuk from "@/app/surat-masuk/components/FormSuratMasuk";

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
      <Sidebar active={"Surat Massuk"} />

      <Main
        active={"Surat Masuk"}
        description={"Tambah data surat masuk di sini"}
      >
        <FormSuratMasuk />
      </Main>
    </main>
  );
}
