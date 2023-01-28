import * as Styled from "./Title.styles";
import { useMapContext } from "../../context/map-context";

function Title() {
  const { idle } = useMapContext();

  return (
    <Styled.Container small={idle}>
      <Styled.Title>Camino de Santiago</Styled.Title>
    </Styled.Container>
  );
}

export default Title;
