import { Dispatch, ReactNode, SetStateAction } from "react";

export type MapContextType = {
  idle: boolean;
  setIdle: Dispatch<SetStateAction<boolean>>;
  distance?: number;
  setDistance: Dispatch<SetStateAction<number | undefined>>;
  activities?: number;
  setActivities: Dispatch<SetStateAction<number | undefined>>;
};

export type MapContextProviderType = {
  children: ReactNode | ReactNode[];
};
