import { createContext, useContext, useState } from "react";
import { MapContextProviderType, MapContextType } from "./map-context.types";

const MapContext = createContext<MapContextType>({
  idle: false,
  setIdle: () => {},
});

export const useMapContext = () => useContext(MapContext);

function MapContextProvider({ children }: MapContextProviderType) {
  const [idle, setIdle] = useState(false);

  return (
    <MapContext.Provider value={{ idle, setIdle }}>
      {children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;
