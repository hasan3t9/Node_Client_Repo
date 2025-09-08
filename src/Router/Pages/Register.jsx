import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import axiosInstance from "../../Hooks/useAxios";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, verifyUser, LogOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;
    console.log({ name, email, password, photoUrl });
    createUser(email, password)
      .then(() => {
        verifyUser()
          .then(() => {
            const newUser = {
              name: name,
              email: email,
              photo: photoUrl,
              role: "user",
            };
            axiosInstance.post("/users", newUser).then((res) => {
              if (res.data.insertedId) {
                toast.success("User saved");
              }
            });
            LogOutUser()
              .then(() => {
                Swal.fire({
                  title: "Verification email sent. Please check your inbox.",
                  icon: "info",
                  draggable: true,
                });
                navigate("/login");
              })
              .catch((err) => {
                console.error("Logout failed:", err);
              });
          })
          .catch((err) => {
            console.error("Error sending verification email:", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1"> Name</label>
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Photo URL</label>
          <input
            name="photoUrl"
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline font-bold text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
