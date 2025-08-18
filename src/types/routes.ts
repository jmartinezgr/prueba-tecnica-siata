import { ComponentType } from "react";

export type RouteComponent = {
  pathName: string;
  component: ComponentType<any>;
  isProtected: boolean;
};
