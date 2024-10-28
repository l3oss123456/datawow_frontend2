import React from "react";
import { colors } from "../../configs/theme";
import FormLogin from "./FormLogin";
import ImageLogin from "./ImageLogin";
import { IUseForm } from "../../interfaces/useForm.interface";
import Styled from "./styled";

interface ILoginComponentProps {
  useForm: IUseForm;
}

const LoginComponent: React.FC<ILoginComponentProps> = ({ useForm }) => {
  return (
    <>
      <Styled.Section width={"60vw"} backgroundColor={colors.main.green500}>
        <FormLogin useForm={useForm} />
      </Styled.Section>

      <Styled.Section
        isImageLogin
        width={"40vw"}
        backgroundColor={colors.main.green300}
      >
        <ImageLogin />
      </Styled.Section>
    </>
  );
};

export default LoginComponent;
