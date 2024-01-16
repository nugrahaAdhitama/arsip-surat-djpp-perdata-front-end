import React, { useState } from "react";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";

const Sidebar: React.FC<any> = ({ active }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<any>(active);

  const menus = [
    {
      id: 1,
      name: "Surat Masuk",
      link: "/surat-masuk",
      component: <MailIcon color="inherit" fontSize="inherit" />,
      text: "Surat Masuk",
    },
    {
      id: 2,
      name: "Surat Keluar",
      link: "/surat-keluar",
      component: <SendIcon color="inherit" fontSize="inherit" />,
      text: "Surat Keluar",
    },
  ];

  const handleLogoutUser = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully log out!",
      });

      localStorage.removeItem("token");
      router.push("/auth");

      console.log(response);
    } catch (error) {
      console.error(error);
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
          title: "Failed to logout, token is not recognized!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please logout again later!",
        });
      }
    }
  };

  return (
    <section className="flex flex-col w-3/12 bg-white rounded-l-3xl shadow-md">
      <div className="w-16 mx-auto mt-12 mb-20 pl-4 pr-5 pt-2 pb-3 bg-secondary rounded-2xl text-primary text-4xl">
        <WidgetsRoundedIcon color="inherit" fontSize="inherit" />
      </div>

      <nav className="relative flex flex-col py-0 items-center">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={menu.link}
            about={menu.name}
            title={menu.name}
            className={`w-full p-4 border rounded-2xl mb-4 text-2xl flex items-center justify-center py-5 ${
              menu.name == activeMenu
                ? "text-primary bg-secondary border-secondary"
                : "text-gray-700"
            } hover:text-primary hover:bg-secondary hover:border-secondary duration-700 transition-all`}
          >
            <p className="mr-5">{menu.component}</p>
            {menu.text}
          </Link>
        ))}

        <button
          type="button"
          onClick={handleLogoutUser}
          className="w-16 p-4 mt-8 border text-gray-700 rounded-2xl text-2xl flex items-center justify-center py-5"
        >
          <p className="mr-5">
            <LogoutOutlinedIcon color="inherit" fontSize="inherit" />
          </p>
          <p>Logout</p>
        </button>
      </nav>
    </section>
  );
};

export default Sidebar;
