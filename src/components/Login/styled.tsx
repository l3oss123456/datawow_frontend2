import styled from "styled-components";
import { colors } from "../../configs/theme";
import responsive from "../../configs/responsive.json";
import { Box } from "@mui/material";

export default {
  Section: styled.div<any>`
    display: flex;
    justify-content: center;
    align-items: center;
    // gap: 20px;
    color: ${colors.base.white};
    width: ${(props) => {
      return props.width ?? "auto";
    }};
    background-color: ${(props) => {
      return props.backgroundColor ?? colors.base.white;
    }};

    border-top-left-radius: ${(props) =>
      props.isImageLogin ? "36px" : undefined};
    border-bottom-left-radius: ${(props) =>
      props.isImageLogin ? "36px" : undefined};

    @media (max-width: ${responsive.sm.max}px) {
      width: 100vw;

      border-top-left-radius: 0px;
      border-bottom-left-radius: 36px;
      border-bottom-right-radius: 36px;
    }
  `,

  FormInfoWrapper: styled(Box)<any>`
    width: 60%;

    .css-a12wv3-MuiInputBase-input-MuiOutlinedInput-input {
      background: white;
    }

    @media (max-width: ${responsive.sm.max}px) {
      height: 60vh;
      width: 100%;
      padding: 0px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .css-a12wv3-MuiInputBase-input-MuiOutlinedInput-input {
        width: 90vw;
      }
    }
  `,

  ImageLoginWrapper: styled(Box)<any>`
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};
