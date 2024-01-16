import React, { useRef, useState } from "react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import Swal from "sweetalert2";
import axios, { isAxiosError } from "axios";
import "@/styles/styles.css";

export default function FormSuratKeluar() {
  const router = useRouter();
  const storedToken = getToken();
  const [tanggal_keluar, setTanggalKeluar] = useState<string>("");
  const [tanggal_surat, setTanggalSurat] = useState<string>("");
  const [asal_surat, setAsalSurat] = useState<string>("");
  const [nomor_surat, setNomorSurat] = useState<string>("");
  const [perihal, setPerihalSurat] = useState<string>("");
  const [file_surat_keluar, setFileSuratKeluar] = useState<any>(null);
  const [catatan_surat, setCatatanSurat] = useState<string>("");
  const [keterangan_surat, setKeteranganSurat] = useState<string>("");
  const [tujuan_surat, setTujuanSurat] = useState<string>("");

  const onChangeTanggalKeluar = (e: any) => {
    setTanggalKeluar(e.target.value);
  };

  const onChangeAsalSurat = (e: any) => {
    setAsalSurat(e.target.value);
  };

  const onChangeTanggalSurat = (e: any) => {
    setTanggalSurat(e.target.value);
  };

  const onChangeNomorSurat = (e: any) => {
    setNomorSurat(e.target.value);
  };

  const onChangePerihalSurat = (e: any) => {
    setPerihalSurat(e.target.value);
  };

  const onChangeCatatanSurat = (e: any) => {
    setCatatanSurat(e.target.value);
  };

  const onChangeKeteranganSurat = (e: any) => {
    setKeteranganSurat(e.target.value);
  };

  const onChangeTujuanSurat = (e: any) => {
    setTujuanSurat(e.target.value);
  };

  const handleUploadSuratKeluar = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tanggal_keluar", tanggal_keluar);
    formData.append("tanggal_surat", tanggal_surat);
    formData.append("asal_surat", asal_surat);
    formData.append("nomor_surat", nomor_surat);
    formData.append("perihal", perihal);
    formData.append("catatan_surat", catatan_surat);
    formData.append("keterangan_surat", keterangan_surat);
    formData.append("tujuan_surat", tujuan_surat);
    formData.append("file_surat_keluar", file_surat_keluar);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/surat-keluar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        icon: "success",
        title: "Berhasil Menambah Surat Keluar!",
      });

      router.push("/surat-keluar");
    } catch (error) {
      console.error("Error posting data: ", error);
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Failed to upload surat masuk, unauthenticated!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please upload it later!",
        });

        router.push("/surat-keluar");
      }
    }
  };

  return (
    <form
      action="POST"
      encType="multipart/form-data"
      className="flex flex-col gap-3 mt-5 p-5 bg-secondary rounded-xl w-full h-full text-primary"
      onSubmit={handleUploadSuratKeluar}
    >
      <div className="flex flex-row gap-3">
        <Input
          label="Tanggal Keluar"
          name="tanggal_keluar"
          type="date"
          placeholder="Masukkan tanggal keluar surat..."
          value={tanggal_keluar}
          onChange={onChangeTanggalKeluar}
          width="full"
        />

        <Input
          label="Tanggal Surat"
          name="tanggal_surat"
          type="date"
          placeholder="Masukkan tanggal surat..."
          value={tanggal_surat}
          onChange={onChangeTanggalSurat}
          width="full"
        />
      </div>

      <div className="flex flex-row gap-3">
        <Input
          label="Asal Surat"
          name="asal_surat"
          type="text"
          placeholder="Masukkan asal surat..."
          value={asal_surat}
          onChange={onChangeAsalSurat}
          width="half"
        />

        <Input
          label="Tujuan Surat"
          name="tujuan_surat"
          type="text"
          placeholder="Masukkan tujuan surat..."
          value={tujuan_surat}
          onChange={onChangeTujuanSurat}
          width="half"
        />

        <Input
          label="Nomor Surat"
          name="nomor_surat"
          type="text"
          placeholder="Masukkan nomor surat..."
          value={nomor_surat}
          onChange={onChangeNomorSurat}
          width="half"
        />
      </div>

      <div className="flex flex-row gap-3">
        <TextArea
          label="Catatan Surat (jika ada)"
          name="catatan_surat"
          placeholder="Masukkan catatan surat..."
          value={catatan_surat}
          onChange={onChangeCatatanSurat}
          width="half"
        />

        <TextArea
          label="Keterangan Surat (jika ada)"
          name="keterangan_surat"
          placeholder="Masukkan keterangan surat..."
          value={keterangan_surat}
          onChange={onChangeKeteranganSurat}
          width="half"
        />

        <TextArea
          label="Perihal"
          name="perihal"
          placeholder="Masukkan perihal surat..."
          value={perihal}
          onChange={onChangePerihalSurat}
          width="half"
        />
      </div>

      <label htmlFor="file_surat_masuk">
        Pilih file surat keluar di sini...
      </label>
      <input
        id="file_surat_masuk"
        name="file_surat_masuk"
        type="file"
        placeholder="Masukkan file surat..."
        onChange={(e: any) => setFileSuratKeluar(e.target.files[0])}
        width="full"
      />

      <button
        about="Submit"
        title="Submit"
        type="submit"
        className={`bg-primary text-secondary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:text-primary hover:bg-tersier md:mt-0 w-full duration-700 transition-all`}
      >
        Tambah Surat Keluar
      </button>
    </form>
  );
}
