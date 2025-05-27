import React, { useEffect } from "react";
import { Modal, Form, Input, Space, Button } from "antd";

interface SubjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; description: string }) => void;
  initialValues?: { name: string; description: string };
  parentId?: string | null;
  loading?: boolean;
  modoEdicao?: boolean;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  loading = false,
  modoEdicao = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={modoEdicao ? "Editar Assunto" : "Cadastrar Assunto"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Nome do Assunto"
          rules={[{ required: true, message: "Digite o nome do assunto" }]}
        >
          <Input placeholder="Ex: Álgebra" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: "Digite a descrição do assunto" }]}
        >
          <Input placeholder="Ex: Assunto de matemática" />
        </Form.Item>
        <Form.Item>
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button onClick={onClose} style={{ minWidth: 100 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ minWidth: 100 }}
              loading={loading}
            >
              {modoEdicao ? "Salvar" : "Cadastrar"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
