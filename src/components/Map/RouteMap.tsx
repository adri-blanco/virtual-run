import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSource, Map } from "mapbox-gl";
import along from "@turf/along";
import length from "@turf/length";
import * as Styled from "./RouteMap.styles";
import Route from "../../assets/camino-de-fisterra";
import { useMapContext } from "../../context/map-context";
import { Feature, Point, Position, lineString } from "@turf/helpers";

const ANIMATION_STEP = 0.15;
const TITLE_ANIMATION_MS = 3500;

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

function generatePoint(coord: Position): Feature<Point> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [coord[0], coord[1]],
    },
  };
}

function addPoint(map: Map) {
  const coords = Route.features[0].geometry.coordinates;

  map.addSource("athleteMarker", {
    type: "geojson",
    data: generatePoint(coords[0]),
  });

  map.addLayer({
    id: "athleteIcon",
    source: "athleteMarker",
    type: "symbol",
    layout: {
      "icon-image": "pitch",
      "icon-size": 1.5,
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  });
}

function animate(
  map: Map,
  routeLength: number,
  distance: number,
  onFinish: () => void,
  current = 0
) {
  const Coordinates = Route.features[0].geometry.coordinates;
  if (routeLength <= current || distance <= current) {
    onFinish();
    return;
  }

  const nextPosition = along(
    lineString(Coordinates),
    current + ANIMATION_STEP,
    { units: "kilometers" }
  );

  const source = map.getSource("athleteMarker") as GeoJSONSource;
  source.setData(generatePoint(nextPosition.geometry.coordinates));

  const camera = map.getFreeCameraOptions();

  // set the position and altitude of the camera
  camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
    {
      lng: nextPosition.geometry.coordinates[0],
      lat: nextPosition.geometry.coordinates[1],
    },
    80000
  );

  map.setFreeCameraOptions(camera);

  requestAnimationFrame(() =>
    animate(map, routeLength, distance, onFinish, current + ANIMATION_STEP)
  );
}

function RouteMap() {
  const map = useRef<Map | null>(null);
  const { distance, idle } = useMapContext();

  const onAnimationFinish = useCallback(() => {
    setTimeout(async () => {
      centerView(map.current as Map);
    }, 1000);
  }, []);

  useEffect(() => {
    if (distance && idle && map.current) {
      setTimeout(async () => {
        animate(map.current as Map, length(Route), distance, onAnimationFinish);
      }, TITLE_ANIMATION_MS);
    }
  }, [distance, idle, onAnimationFinish]);

  function onLoad(mapRef: MutableRefObject<Map>) {
    map.current = mapRef.current;
    addRoute(map.current);
    addPoint(map.current);
  }

  const INITIAL_COORD = Route.features[0].geometry.coordinates[0];
  return (
    <Styled.Map
      center={[INITIAL_COORD[0], INITIAL_COORD[1]]}
      onLoad={onLoad}
      zoom={10.01}
    />
  );
}

export default RouteMap;
