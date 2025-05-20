import React from "react";
import * as S from "./styles";
import { LoginForm } from "../../components/Form/LoginForm";
export const Login: React.FC = () => {
  return (
    <S.Container>
      <S.Column>
        <LoginForm />
      </S.Column>
      <S.Column
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
        }}
      />
    </S.Container>
  );
};
