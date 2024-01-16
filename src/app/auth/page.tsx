"use client";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { getToken, setTokenWithExpiration } from "@/utils/token";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Auth: React.FC<any> = ({ type }) => {
  const router = useRouter();
  const storedToken = getToken();

  if (storedToken) {
    router.push("/");
  }

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginUser = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData
      );

      setIsLoading(false);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully log in!",
      });

      setTokenWithExpiration(response.data.authorisation.token, 3600);

      router.push("/");
    } catch (error) {
      setIsLoading(false);
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
          title: "Failed to login, username or password is wrong!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please login again later!",
        });
      }
    }

    setUsername("");
    setPassword("");
  };

  return (
    <main className="flex flex-col md:flex-row w-full h-screen bg-primary relative items-center justify-center">
      <section
        className={`flex flex-col gap-10 ${
          isLoading ? "pt-14 pb-6" : "py-14"
        } px-8 bg-white w-fit md:w-[45%] rounded-3xl`}
      >
        <div className="flex flex-col gap-1 w-full items-center justify-center">
          <h1 className="h1 text-4xl font-semibold text-primary">
            Welcome Back!
          </h1>
          <p className="text-base text-tersier">
            Kelola semua surat masuk dan keluar di sini!
          </p>
        </div>

        <form
          onSubmit={handleLoginUser}
          action="post"
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <Input
            label="Username"
            name="user"
            type="text"
            placeholder="Masukkan username di sini..."
            value={username}
            onChange={onChangeUsername}
            width="full"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={onChangePassword}
            width="full"
          />

          {isLoading ? (
            <Loader />
          ) : (
            <button
              about="Login"
              title="Login"
              type="submit"
              className={`bg-secondary text-primary font-medium text-base rounded-full px-2 md:px-5 py-4 text-center cursor-pointer mt-4 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}
            >
              Login
            </button>
          )}
        </form>
      </section>

      {/* <p className="text-sm text-tersier absolute bottom-8 text-center">
        &copy; Candiate College 2023
      </p> */}
    </main>
  );
};

export default Auth;
