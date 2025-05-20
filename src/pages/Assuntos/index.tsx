import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "../../components/StatsCard/Card";

// Tipo do Assunto
interface Assunto {
  id: number;
  name: string;
  description: string;
  qtdQuestions: number;
}

const DADOS_MOCK: Assunto[] = [
  { id: 1, name: "Matemática", description: "Matemática", qtdQuestions: 10 },
  { id: 2, name: "Português", description: "Português", qtdQuestions: 10 },
];

export const Assuntos: React.FC = () => {
  const [assuntos, setAssuntos] = useState<Assunto[]>(DADOS_MOCK);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalDeleteVisivel, setModalDeleteVisivel] = useState(false);
  const [assuntoEditando, setAssuntoEditando] = useState<Assunto | null>(null);
  const [assuntoDeletando, setAssuntoDeletando] = useState<Assunto | null>(
    null
  );
  const [form] = Form.useForm();

  // Abrir modal para criar
  const abrirModalCriar = () => {
    setAssuntoEditando(null);
    form.resetFields();
    setModalVisivel(true);
  };

  // Abrir modal para editar
  const abrirModalEditar = (assunto: Assunto) => {
    setAssuntoEditando(assunto);
    form.setFieldsValue(assunto);
    setModalVisivel(true);
  };

  // Salvar (criar ou editar)
  const onSalvar = (values: any) => {
    if (assuntoEditando) {
      setAssuntos((prev) =>
        prev.map((a) =>
          a.id === assuntoEditando.id ? { ...a, name: values.name } : a
        )
      );
      message.success("Assunto editado com sucesso!");
    } else {
      const novo: Assunto = {
        id: Math.max(...assuntos.map((a) => a.id), 0) + 1,
        name: values.name,
        description: values.description,
        qtdQuestions: values.qtdQuestions,
      };
      setAssuntos((prev) => [...prev, novo]);
      message.success("Assunto cadastrado com sucesso!");
    }
    setModalVisivel(false);
  };

  // Abrir modal de confirmação de delete
  const abrirModalDelete = (assunto: Assunto) => {
    setAssuntoDeletando(assunto);
    setModalDeleteVisivel(true);
  };

  // Confirmar delete
  const confirmarDelete = () => {
    if (assuntoDeletando) {
      setAssuntos((prev) => prev.filter((a) => a.id !== assuntoDeletando.id));
      message.success("Assunto deletado com sucesso!");
    }
    setModalDeleteVisivel(false);
  };

  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantidade de Questões",
      dataIndex: "qtdQuestions",
      key: "qtdQuestions",
    },
    {
      title: "Ações",
      key: "acoes",
      width: 140,
      render: (_: any, record: Assunto) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => abrirModalEditar(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => abrirModalDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Assuntos</h2>
          <p style={{ margin: 0, color: "#666" }}>
            Gerencie todos os seus assuntos em um só lugar
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          icon={<span>📚</span>}
          bg="#e6f7ff"
          label="Assuntos Totais"
          labelColor="#6a7282"
          value="100"
          valueColor="#000"
          trend="up"
          percent={12}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
        <Card
          icon={<span>🔍</span>}
          bg="#fff1f0"
          label="Assunto Menos Visto"
          labelColor="#6a7282"
          value="Geografia"
          valueColor="#000"
          trend="down"
          percent={5}
          subtitle="em relação ao mês passado"
          trendColor="#f5222d"
        />
        <Card
          icon={<span>📈</span>}
          bg="#f6ffed"
          label="Assunto Mais Visto"
          labelColor="#6a7282"
          value="Matemática"
          valueColor="#000"
          trend="up"
          percent={20}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
        <Card
          icon={<span>🆕</span>}
          bg="#e6f7ff"
          label="Assuntos Recentes"
          labelColor="#6a7282"
          value="5"
          valueColor="#000"
          trend="up"
          percent={15}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Button type="default" onClick={abrirModalCriar}>
            <PlusOutlined />
            Novo Assunto
          </Button>
        </div>
        <Table
          bordered
          columns={colunas}
          dataSource={assuntos}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal de criar/editar */}
      <Modal
        title={assuntoEditando ? "Editar Assunto" : "Cadastrar Assunto"}
        open={modalVisivel}
        onCancel={() => setModalVisivel(false)}
        onOk={() => form.submit()}
        okText={assuntoEditando ? "Salvar" : "Cadastrar"}
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" onFinish={onSalvar}>
          <Form.Item
            name="name"
            label="Nome do Assunto"
            rules={[{ required: true, message: "Digite o nome do assunto" }]}
          >
            <Input placeholder="Ex: Matemática" size="large" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              { required: true, message: "Digite a descrição do assunto" },
            ]}
          >
            <Input placeholder="Ex: Matemática" size="large" />
          </Form.Item>
          <Form.Item name="categoriaPai" label="Categoria Pai">
            <Select
              showSearch
              size="large"
              placeholder="Selecione uma categoria"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children?.toString().toLowerCase() || "").includes(
                  input.toLowerCase()
                )
              }
            >
              <Select.Option value="categoria1">Algebra</Select.Option>
              <Select.Option value="categoria2">Geometria</Select.Option>
              <Select.Option value="categoria3">Trigonometria</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de confirmação de delete */}
      <Modal
        open={modalDeleteVisivel}
        onCancel={() => setModalDeleteVisivel(false)}
        onOk={confirmarDelete}
        okText="Deletar"
        okButtonProps={{ danger: true }}
        cancelText="Cancelar"
      >
        Tem certeza que deseja deletar o assunto "{assuntoDeletando?.name}"?
      </Modal>
    </div>
  );
};
