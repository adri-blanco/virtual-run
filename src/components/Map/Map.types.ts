import { Map } from "mapbox-gl";
import { MutableRefObject } from "react";

type MapProps = {
  center?: [number, number];
  className?: string;
  onLoad?: (ref: MutableRefObject<Map>) => void;
  zoom?: number;
};

export default MapProps;
