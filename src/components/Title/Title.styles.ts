import styled, { css, keyframes } from "styled-components/macro";

type ContainerProps = {
  small: boolean;
};

const MakeItSmall = keyframes`
  0% {
    height: 100%;
    width: 100%;
  }

  40% {
    height: min(15%, 200px);
    width: 100%;
  }

  60% {
    height: min(15%, 200px);
  }

  100% {
    width: min(100%, 700px);
    height: min(15%, 200px);
  }
`;

export const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  gap: 24px;
  background: white;
  padding: 24px 48px;
  z-index: 3;

  bottom: 0;

  height: 100%;
  width: 100%;

  ${({ small }) =>
    small &&
    css`
      animation: ${MakeItSmall} 3s forwards;
    `}

  ${({ small }) =>
    !small &&
    css`
      align-items: center;
    `}
`;

export const InnerContainer = styled.div`
  display: flex;
`;

export const Title = styled.span`
  font-size: clamp(1.5rem, 4.5vw, 5rem);
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: center;
`;
