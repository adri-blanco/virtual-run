import { createGlobalStyle } from "styled-components";

import GingerTTF from "./assets/ginger/Ginger.ttf";
import GingerWoff from "./assets/ginger/Ginger.woff";

export default createGlobalStyle`
  @font-face {
  font-family: 'Ginger';
  src: url(${GingerWoff}) format('woff'),
        url(${GingerTTF}) format('ttf');
  }

  body {
    margin: 0;
    font-family: Ginger;
  }

`;
