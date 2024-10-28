import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import TemplateForm from "../TemplateForm/TemplateForm";
import Styled from "./styled";
import { colors } from "../../configs/theme";
import { IUseForm } from "../../interfaces/useForm.interface";

interface IFormLoginProps {
  useForm: IUseForm;
}

const FormLogin: React.FC<IFormLoginProps> = ({ useForm }) => {
  const { watch } = useForm;

  const renderHeader = () => {
    return (
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        {"Sign in"}
      </Typography>
    );
  };

  const renderForm = () => {
    return (
      <Box sx={{ marginTop: "25px" }}>
        <TemplateForm
          form_info={{
            name: "username",
            field_type: "text",
            // field_label: "username",
            placeholder: "Username",
            variant: "outlined",
            value: watch("username") ?? "",
            rules: {
              required: "กรุณาใส่ Username",
            },
          }}
          useForm={useForm}
        />

        <Button
          type={"submit"}
          sx={{
            width: "100%",
            backgroundColor: colors.main.green300,
            marginTop: "5px",
          }}
        >
          <Typography sx={{ fontSize: 14, color: colors.base.white }}>
            {"Sign In"}
          </Typography>
        </Button>
      </Box>
    );
  };

  return (
    <Styled.FormInfoWrapper>
      {renderHeader()}
      {renderForm()}
    </Styled.FormInfoWrapper>
  );
};

export default FormLogin;
