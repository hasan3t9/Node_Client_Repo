import { useQuery } from "@tanstack/react-query";

import axiosInstance from "./useAxios";
import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const {
    data: role = "user",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
