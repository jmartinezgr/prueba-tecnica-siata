export type SiteConfig = typeof siteConfig;

import IndexPage from "@/pages";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { RouteComponent } from "@/types/routes";

export const siteConfig = {
  name: "SIMET",
  description: "Sistema de Monitoreo de Estaciones",
  privateNavItems: [
    {
      label: "Estaciones",
      href: "/estaciones",
    },
    {
      label: "Perfil",
      href: "/perfil",
    },
  ],
  publicNavItems: [],

  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export const routesMap: RouteComponent[] = [
  {
    pathName: "/login",
    isProtected: false,
    component: LoginPage,
  },
  {
    pathName: "/register",
    isProtected: false,
    component: RegisterPage,
  },
  {
    pathName: "/",
    isProtected: false,
    component: IndexPage,
  },
  {
    pathName: "/home",
    isProtected: true,
    component: HomePage,
  },
];

export const privateRoutes = routesMap
  .filter((route) => route.isProtected)
  .map((route) => route.pathName);
