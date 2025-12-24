import { ReactNode } from "react";

export type TSideBarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSideBarItem[];
    }
  | undefined;
