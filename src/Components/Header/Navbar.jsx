import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import AuthContext from "../../Provider/AuthContext";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosInstance from "../../Hooks/useAxios";

const Navbar = () => {
  const { user, loading, LogOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get("/users", { params: { email: user.email } })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email]);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        LogOutUser()
          .then(() => {
            navigate("/");
            Swal.fire({
              title: "Logged Out!",
              text: "Log Out Successfully Done",
              icon: "success",
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="navbar  shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/about"}
              >
                About{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-600" : "")}
                to={"/dashboard"}
              >
                Dashboard{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">Node JS</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
              to={"/about"}
            >
              About{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
              to={"/dashboard"}
            >
              Dashboard{" "}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end items-center gap-4">
        {user ? (
          <div
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="avatar"
          >
            <div className="ring-primary w-9 h-9  ring-offset-base-100  rounded-full ring-2 ring-offset-2">
              <img src={userData?.photo} />
            </div>
          </div>
        ) : (
          <Link
            to={"login"}
            className="btn bg-blue-600 hover:bg-blue-700 border-none text-white"
          >
            Login
          </Link>
        )}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex justify-center items-center gap-3">
              <div className="avatar">
                <div className="ring-primary w-9 h-9  ring-offset-base-100  rounded-full ring-2 ring-offset-2">
                  <img src={userData?.photo} />
                </div>
              </div>
              <h3 className="font-bold  text-xl">{userData?.name}</h3>
            </div>
            <div
              onClick={handleLogOut}
              className="flex justify-center items-center pt-10"
            >
              <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white">
                {" "}
                Logout
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
