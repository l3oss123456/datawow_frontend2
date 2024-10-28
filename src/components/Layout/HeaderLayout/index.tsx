import React from "react";
import Styled from "./styled";
import HeaderLeftContainer from "./HeaderLeftContainer";
import HeaderRightContainer from "./HeaderRightContainer";

const HeaderLayout: React.FC = () => {
  return (
    <Styled.Container>
      <HeaderLeftContainer />
      <HeaderRightContainer />
    </Styled.Container>
  );
};

export default HeaderLayout;
