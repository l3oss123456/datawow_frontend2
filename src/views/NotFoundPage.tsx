import { Box } from "@mui/material";
import React from "react";
import popup_error from "../assets/popup/popup_error.png";

export interface INotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <img
            src={popup_error}
            alt="Preview"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default NotFoundPage;
