import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../Provider/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  const { logInUser, setUser, LogOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logInUser(email, password).then((result) => {
      const user = result.user;
      if (!user.emailVerified) {
        toast.error("Please Verify Your Email");
        LogOutUser()
          .then(() => {
            Swal.fire({
              title: "Verification email sent. Please check your inbox.",
              icon: "info",
              draggable: true,
            });
            return window.open(
              " https://mail.google.com/mail/u/0/#inbox",
              "_blank"
            );
          })
          .catch((err) => {
            console.error("Logout failed:", err);
          });
      }
      setUser(user);
      navigate("/");
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <Link className="underline text-blue-600 pl-1">Forgot Password?</Link>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-3 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <p className="mt-1 p-1">
          Don't have an account ?{" "}
          <Link to={"/register"} className="underline font-bold text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
