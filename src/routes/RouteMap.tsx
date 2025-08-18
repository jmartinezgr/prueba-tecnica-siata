import IndexPage from "@/pages";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { RouteComponent } from "@/types/routes";

export const routesMap: RouteComponent[] = [
  {
    pathName: "/login",
    isProtected: false,
    component: <LoginPage />,
  },
  {
    pathName: "/register",
    isProtected: false,
    component: <RegisterPage />,
  },
  {
    pathName: "/",
    isProtected: false,
    component: <IndexPage />,
  },
  {
    pathName: "/home",
    isProtected: true,
    component: <HomePage />,
  },
];
