import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;

  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
`;

export const ForgotPassword = styled.a`
  float: right;
  margin-bottom: 24px;
`;
