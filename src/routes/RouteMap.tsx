import IndexPage from "@/pages";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { RouteComponent } from "@/types/routes";

export const routesMap: RouteComponent[] = [
  {
    pathName: "/login",
    isProtected: false,
    component: <Login />,
  },
  {
    pathName: "/register",
    isProtected: false,
    component: <Register />,
  },
  {
    pathName: "/",
    isProtected: true,
    component: <IndexPage />,
  },
];
