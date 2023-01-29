declare module "*.woff";
declare module "*.ttf";

export type Activity = {
  avgSpeed: number;
  elapsedTime: number;
  maxSpeed: number;
  avgCadence?: number;
  distance: number;
  athlete: number;
  movingTime: number;
  startDate: string;
  wasRace: boolean;
  name: string;
  sportType: string;
  elevationGain: number;
  startDateUnix: number;
};

export type ActivityResponse = {
  distance: number;
  length: number;
  since?: string;
  activities: Activity[];
};
