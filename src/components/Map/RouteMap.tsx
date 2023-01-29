import { MutableRefObject, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import * as Styled from "./RouteMap.styles";
import Route from "../../assets/camino-de-fisterra";

const center = [-5.340904756902802, 43.20495172039625];

function addRoute(map: Map) {
  map.addSource("route", {
    type: "geojson",
    data: Route,
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 2,
    },
  });
}

function centerView(map: Map) {
  const coords = Route.features[0].geometry.coordinates;
  const bounds = new mapboxgl.LngLatBounds(
    [coords[0][0], coords[0][1]],
    [coords[coords.length - 1][0], coords[coords.length - 1][1]]
  );

  map.fitBounds(bounds, {
    padding: 40,
  });
}

function RouteMap() {
  const map = useRef<Map | null>(null);

  function onLoad(mapRef: MutableRefObject<Map>) {
    map.current = mapRef.current;
    addRoute(map.current);
    centerView(map.current);
  }

  return <Styled.Map center={[center[0], center[1]]} onLoad={onLoad} />;
}

export default RouteMap;
