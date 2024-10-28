import styled from "styled-components";
import responsive from "../../configs/responsive.json";
import { colors } from "../../configs/theme";

export default {
  Container: styled.div`
    display: flex;
    height: 100vh;
    background-color: ${colors.main.green500};

    @media (max-width: ${responsive.sm.max}px) {
      flex-direction: column-reverse;
      justify-content: flex-start;
      height: auto;
    }
  `,
};
