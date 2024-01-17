import React, { useRef, useState } from "react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import Swal from "sweetalert2";
import axios, { isAxiosError } from "axios";
import "@/styles/styles.css";

const SkeletonInput = () => (
  <div className="animate-pulse bg-gray-300 h-10 w-full my-2 rounded-md" />
);

const SkeletonTextArea = () => (
  <div className="animate-pulse bg-gray-300 h-20 w-full my-2 rounded-md" />
);

export default function FormSuratMasuk() {
  const router = useRouter();
  const storedToken = getToken();
  const [tanggal_masuk, setTanggalMasuk] = useState<string>("");
  const [tanggal_surat, setTanggalSurat] = useState<string>("");
  const [asal_surat, setAsalSurat] = useState<string>("");
  const [nomor_surat, setNomorSurat] = useState<string>("");
  const [perihal_surat, setPerihalSurat] = useState<string>("");
  const [file_surat_masuk, setFileSuratMasuk] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeTanggalMasuk = (e: any) => {
    setTanggalMasuk(e.target.value);
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

  const handleUploadSuratMasuk = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("tanggal_masuk", tanggal_masuk);
    formData.append("tanggal_surat", tanggal_surat);
    formData.append("asal_surat", asal_surat);
    formData.append("nomor_surat", nomor_surat);
    formData.append("perihal", perihal_surat);
    formData.append("file_surat_masuk", file_surat_masuk);

    try {
      const response = await axios.post(
        "https://resource-arsip-suratmasuk-suratkeluar.my.id/api/surat-masuk",
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
        title: "Berhasil Menambah Surat Masuk!",
      });

      router.push("/surat-masuk");
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

        router.push("/surat-masuk");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      action="POST"
      encType="multipart/form-data"
      className="flex flex-col gap-3 mt-5 p-5 bg-secondary rounded-xl w-full h-full text-primary"
      onSubmit={handleUploadSuratMasuk}
    >
      {isLoading ? (
        // Render Skeletons when loading
        <>
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonTextArea />
          <SkeletonTextArea />
        </>
      ) : (
        // Render form fields when not loading
        <>
          <div className="flex flex-row gap-3">
            <Input
              label="Tanggal Masuk"
              name="tanggal_masuk"
              type="date"
              placeholder="Masukkan tanggal masuk surat..."
              value={tanggal_masuk}
              onChange={onChangeTanggalMasuk}
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
              label="Nomor Surat"
              name="nomor_surat"
              type="text"
              placeholder="Masukkan nomor surat..."
              value={nomor_surat}
              onChange={onChangeNomorSurat}
              width="half"
            />
          </div>

          <TextArea
            label="Perihal"
            name="perihal"
            placeholder="Masukkan perihal surat..."
            value={perihal_surat}
            onChange={onChangePerihalSurat}
            width="full"
          />

          <label htmlFor="file_surat_masuk">
            Pilih file surat masuk di sini...
          </label>
          <input
            id="file_surat_masuk"
            name="file_surat_masuk"
            type="file"
            placeholder="Masukkan file surat..."
            onChange={(e: any) => setFileSuratMasuk(e.target.files[0])}
            width="full"
          />
        </>
      )}

      <button
        about="Submit"
        title="Submit"
        type="submit"
        className={`bg-primary text-secondary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:text-primary hover:bg-tersier md:mt-0 w-full duration-700 transition-all`}
      >
        Tambah Surat Masuk
      </button>
    </form>
  );
}
