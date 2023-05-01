import { createContext, useContext, useState, useEffect } from "react";
import { MapContextProviderType, MapContextType } from "./map-context.types";
import activityServices from "../services/activity-services";

const MapContext = createContext<MapContextType>({
  idle: false,
  setIdle: () => {},
  distance: undefined,
  setDistance: () => {},
  activities: undefined,
  setActivities: () => {},
  error: null,
});

export const useMapContext = () => useContext(MapContext);

function MapContextProvider({ children }: MapContextProviderType) {
  const [idle, setIdle] = useState(false);
  const [distance, setDistance] = useState<number>();
  const [activities, setActivities] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    const result = await activityServices.get();
    if ("error" in result) {
      setError(result.error);
    } else {
      setDistance(result.distance);
      setActivities(result.activities);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MapContext.Provider
      value={{
        idle,
        setIdle,
        distance,
        setDistance,
        activities,
        setActivities,
        error,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;
