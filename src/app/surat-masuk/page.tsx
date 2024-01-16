"use client";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import axios from "axios";

function Home() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  const TABLE_HEAD = [
    "No",
    "Tanggal",
    "Asal Surat",
    "Nomor Surat",
    "Tanggal Surat",
    "Perihal",
    "File",
  ];

  // const TABLE_HEAD = ["Name", "Job", "Employed", ""];

  // const TABLE_ROWS = [
  //   {
  //     name: "John Michael",
  //     job: "Manager",
  //     date: "23/04/18",
  //   },
  //   {
  //     name: "Alexa Liras",
  //     job: "Developer",
  //     date: "23/04/18",
  //   },
  //   {
  //     name: "Laurent Perrier",
  //     job: "Executive",
  //     date: "19/09/17",
  //   },
  //   {
  //     name: "Michael Levi",
  //     job: "Developer",
  //     date: "24/12/08",
  //   },
  //   {
  //     name: "Richard Gran",
  //     job: "Manager",
  //     date: "04/10/21",
  //   },
  // ];

  const [suratMasuk, setSuratMasuk] = useState<any>([]);

  const fetchSuratMasuk = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/surat-masuk",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setTimeout(() => {
        setSuratMasuk(response.data.data);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuratMasuk();
  }, []);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      <Sidebar active={"Surat Masuk"} />

      <Main active={"Surat Masuk"} description={"Kelola Surat Masuk di sini"}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-full h-full no-scrollbar scrollbar-hide">
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-secondary text-primary">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {suratMasuk.map((surat, index) => {
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
                        >
                          {/* {for i = 0; i < suratMasuk.length; i++} */}1
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {surat.tanggal_masuk}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {surat.asal_surat}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {surat.nomor_surat}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {surat.tanggal_surat}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {surat.perihal}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <button className="p-2 bg-secondary text-primary rounded-md hover:bg-primary hover:text-secondary transition-all duration-150">
                            <a href="{surat.file_surat_masuk}">File Surat</a>
                          </button>
                        </Typography>
                      </td>
                      {/* <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {Edit}
                        </Typography>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </Main>
    </main>
  );
}

export default Home;
