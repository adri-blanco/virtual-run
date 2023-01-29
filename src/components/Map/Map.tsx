import { MutableRefObject, useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapProps from "./Map.types";
import { useMapContext } from "../../context/map-context";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const MapComp = ({ className, center, onLoad }: MapProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const { setIdle } = useMapContext();

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: container.current as HTMLElement,
      center,
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 4,
    });

    mapRef.current.on("load", () => {
      onLoad && onLoad(mapRef as MutableRefObject<Map>);
    });

    mapRef.current.on("idle", () => {
      setIdle(true);
    });
  }, [center, onLoad, setIdle]);

  return <div className={className} ref={container} />;
};

export default MapComp;
