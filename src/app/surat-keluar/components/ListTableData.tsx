"use-client";

import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { getToken } from "@/utils/token";
import axios from "axios";

export default function ListTableData() {
  const storedToken = getToken();

  const TABLE_HEAD = [
    "No",
    "Tanggal",
    "Asal Surat",
    "Tujuan Surat",
    "Nomor Surat",
    "Perihal",
    "File",
    "Keterangan",
  ];

  const [suratKeluar, setSuratKeluar] = useState<any>([]);

  const fetchSuratKeluar = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/surat-keluar",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setTimeout(() => {
        setSuratKeluar(response.data.data);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuratKeluar();
  }, []);

  return (
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
          {suratKeluar.map((surat: any, index: number) => {
            const isLast = index === suratKeluar.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                    {surat.tanggal_keluar}
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
                    {surat.tujuan_surat}
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
                        href={`http://127.0.0.1:8000${surat.file_surat_keluar}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        File Surat
                      </a>
                    </button>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder="Your placeholder here"
                  >
                    {surat.keterangan}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}