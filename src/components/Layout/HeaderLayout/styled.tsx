import styled from "styled-components";
import { colors } from "../../../configs/theme";
import responsive from "../../../configs/responsive.json";
import { Box } from "@mui/material";
import { Drawer } from "antd";

export default {
  Container: styled(Box)`
    background-color: ${colors.main.green500};
    color: ${colors.base.white};
    padding: 15px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // position: fixed;
    // width: 96vw;
  `,

  LeftContainer: styled(Box)`
    p {
      font-family: Castoro;
      font-size: 20px;
      font-weight: 400;
      font-style: italic;
    }
  `,

  DesktopRightContainer: styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      font-size: 16px;
      font-weight: 400;
    }

    @media (max-width: ${responsive.sm.max}px) {
      display: none;
    }
  `,

  MobileRightContainer: styled(Box)`
    display: none;

    @media (max-width: ${responsive.sm.max}px) {
      display: flex;
    }
  `,

  MobileDrawerContainer: styled(Drawer)`
    background-color: ${colors.main.green500} !important;

    svg {
      color: ${colors.base.white};
    }
  `,

  MobileRightHeaderMenu: styled(Box)<any>`
    display: flex;
    align-items: center;
    gap: 10px;

    p,
    svg {
      color: ${(props) =>
        props.isSelectedMenu ? colors.base.white : colors.base.grey100};
    }
  `,
};
