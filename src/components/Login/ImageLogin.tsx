import React from "react";
import loginImage from "../../assets/image/login/loginImage.png";
import { Typography } from "@mui/material";
import Styled from "./styled";

const ImageLogin: React.FC = () => {
  return (
    <Styled.ImageLoginWrapper>
      <img
        src={loginImage}
        alt="Login Illustration"
        style={{ width: "100%", height: "auto" }} // Optional: Add styles
      />

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "28px",
          fontStyle: "italic",
          fontFamily: "Castoro",
          marginTop: "10px",
        }}
      >
        {"a Board"}
      </Typography>
    </Styled.ImageLoginWrapper>
  );
};

export default ImageLogin;
