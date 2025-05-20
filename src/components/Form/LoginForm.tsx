import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true);
      console.log("Valores do formulário:", values);
      // Aqui você pode adicionar a lógica de autenticação
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <img src={logo} alt="Logo SAEB" />
      </S.LogoContainer>

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        style={{ width: "400px" }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Por favor, insira seu email" },
            { type: "email", message: "Por favor, insira um email válido" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: "Por favor, insira sua senha" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Senha"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <S.ForgotPassword href="#">Esqueceu sua senha?</S.ForgotPassword>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
}
