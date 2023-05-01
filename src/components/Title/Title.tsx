import * as Styled from "./Title.styles";
import { useMapContext } from "../../context/map-context";
import Route from "../../assets/camino-de-fisterra";
import { useMemo } from "react";
import length from "@turf/length";

function Title() {
  const { idle, distance, activities, error } = useMapContext();
  const destinationDistance = useMemo(() => length(Route), []);

  const isContainerSmall = () => !!(idle && distance && !error);

  return (
    <Styled.Container small={isContainerSmall()}>
      <Styled.Title>Camino de Santiago</Styled.Title>

      {idle && distance && (
        <Styled.DataContainer>
          <span>
            {distance?.toFixed(2)}/{destinationDistance.toFixed(2)}km
          </span>
          <span>{activities} activities</span>
        </Styled.DataContainer>
      )}

      {!idle && !error && <span>Loading...</span>}
      {error && <span>{error}</span>}
    </Styled.Container>
  );
}

export default Title;
