import * as Styled from "./Title.styles";
import { useMapContext } from "../../context/map-context";

function Title() {
  const { idle, distance, activities } = useMapContext();

  return (
    <Styled.Container small={idle}>
      <Styled.Title>Camino de Santiago</Styled.Title>

      {idle && distance && (
        <Styled.DataContainer>
          <span>{distance?.toFixed(2)}/999km</span>
          <span>{activities} activities</span>
        </Styled.DataContainer>
      )}
    </Styled.Container>
  );
}

export default Title;
