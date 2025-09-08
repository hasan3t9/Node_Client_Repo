import React from "react";
import useUserRole from "../../../../Hooks/useUserRole";
import AdminHome from "../Admin/AdminHome";
import UsersHome from "../Users/UsersHome";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading || !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <AdminHome></AdminHome>;
  } else if (role === "user") {
    return <UsersHome></UsersHome>;
  } else {
    return <p>Unathorized</p>;
  }
};

export default DashboardHome;
