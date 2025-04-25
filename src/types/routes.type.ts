import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

// common for bot routes and sidebarItems
export type TuserPath = {
  name: string;
  path: string;
  element?: ReactNode;
  children?: TuserPath[];
};
