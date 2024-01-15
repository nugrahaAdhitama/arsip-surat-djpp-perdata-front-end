"use client";
import Auth from "./auth/page";
import { getToken } from "@/utils/token";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  return (
    <main className="flex items-center justify-center">
      <h1>Halo dunia</h1>
    </main>
  );
}
