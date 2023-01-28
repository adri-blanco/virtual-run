import { Dispatch, ReactNode, SetStateAction } from "react";

export type MapContextType = {
  idle: boolean;
  setIdle: Dispatch<SetStateAction<boolean>>;
};

export type MapContextProviderType = {
  children: ReactNode | ReactNode[];
};
