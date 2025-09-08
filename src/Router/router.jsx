import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashLayout from "../Layouts/DashLayout";
import DashboardHome from "./Pages/Dashboard/DashHome/DashHome";
import PendingPost from "./Pages/Dashboard/Admin/PendingPost";
import MyPosts from "./Pages/Dashboard/Users/MyPost";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashLayout,
    children: [
      {
        path: "/dashboard",
        Component: DashboardHome,
      },
      {
        path: "/dashboard/pending-post",
        Component: PendingPost,
      },
      {
        path: "/dashboard/my-post",
        Component: MyPosts,
      },
    ],
  },
]);
export default router;
