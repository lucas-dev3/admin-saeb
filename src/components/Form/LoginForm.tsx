import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { login, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated, navigate]);

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Erro ao fazer login";
      toast.error(message);
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
