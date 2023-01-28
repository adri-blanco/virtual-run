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
});

export const useMapContext = () => useContext(MapContext);

function MapContextProvider({ children }: MapContextProviderType) {
  const [idle, setIdle] = useState(false);
  const [distance, setDistance] = useState<number>();
  const [activities, setActivities] = useState<number>();

  async function fetchData() {
    const result = await activityServices.get();
    setDistance(result.distance);
    setActivities(result.activities);
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;
