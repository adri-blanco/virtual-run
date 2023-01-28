import * as Styled from "./Title.styles";
import { useMapContext } from "../../context/map-context";

function Title() {
  const { idle, distance, activities } = useMapContext();
  console.log("🚀 ~ file: Title.tsx:6 ~ Title ~ distance", distance);

  return (
    <Styled.Container small={idle}>
      <Styled.Title>Camino de Santiago</Styled.Title>

      <Styled.DataContainer>
        <span>Distance: {distance}/999km</span>
        <span>{activities} activities</span>
      </Styled.DataContainer>
    </Styled.Container>
  );
}

export default Title;
