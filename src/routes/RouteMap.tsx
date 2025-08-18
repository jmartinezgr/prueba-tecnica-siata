import IndexPage from "@/pages";
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
    isProtected: true,
    component: <IndexPage />,
  },
];
