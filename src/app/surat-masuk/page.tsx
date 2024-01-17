"use client";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import ListTableData from "./components/ListTableData";
import Link from "next/link";
import axios from "axios";

const Skeleton = () => (
  <div className="animate-pulse bg-gray-300 h-4 w-full my-2" />
);

function Home() {
  const router = useRouter();
  const storedToken = getToken();
  const [isLoading, setIsLoading] = useState(true);

  const TABLE_HEAD = [
    "No",
    "Tanggal",
    "Asal Surat",
    "Nomor Surat",
    "Tanggal Surat",
    "Perihal",
    "File",
  ];

  //

  const [suratMasuk, setSuratMasuk] = useState<any>([]);

  useEffect(() => {
    const fetchSuratMasuk = async () => {
      try {
        const response = await axios.get(
          "https://5077-119-18-156-78.ngrok-free.app/api/surat-masuk",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        setTimeout(() => {
          setSuratMasuk(response.data.data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuratMasuk();
  }, [storedToken]);

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      <Sidebar active={"Surat Masuk"} />

      <Main active={"Surat Masuk"} description={"Kelola Surat Masuk di sini"}>
        <div className="flex flex-col gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-full h-full no-scrollbar scrollbar-hide">
          <div className="flex justify-end">
            <button className="bg-secondary py-1 rounded-md text-primary mx-5 w-[300px] hover:bg-primary hover:text-secondary animation-all duration-150">
              <Link href="/surat-masuk/tambah" className="block">
                Tambah Data Surat Masuk
              </Link>
            </button>
          </div>
          <Card className="h-full w-full overflow-scroll" placeholder="">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-secondary text-primary">
                <tr className="bg-secondary text-primary">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-secondary text-primary-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        placeholder="Your placeholder here"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  // Display skeleton if data is loading
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: TABLE_HEAD.length }).map(
                        (_, cellIndex) => (
                          <td key={cellIndex} className="p-4">
                            <Skeleton />
                          </td>
                        )
                      )}
                    </tr>
                  ))
                ) : suratMasuk.length > 0 ? (
                  // Display data if it's loaded
                  suratMasuk.map((surat: any, index: any) => {
                    const isLast = index === suratMasuk.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={surat.id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {surat.tanggal_masuk}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {surat.asal_surat}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {surat.nomor_surat}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {surat.tanggal_surat}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            {surat.perihal}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder="Your placeholder here"
                          >
                            <button className="p-2 bg-secondary text-primary rounded-md hover:bg-primary hover:text-secondary transition-all duration-150">
                              <a
                                href={`https://5077-119-18-156-78.ngrok-free.app${surat.file_surat_masuk}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                File Surat
                              </a>
                            </button>
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // Display message if there are no data entries
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                      Belum ada data surat keluar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </Main>
    </main>
  );
}

export default Home;
