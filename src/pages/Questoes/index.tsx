import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Empty, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card } from "../../components/StatsCard/Card";
import { useNavigate } from "react-router-dom";
import FileTree from "../../components/FileTree";
import api from "../../services/api";
import { SubjectModal } from "../../components/SubjectModal";

// Tipo da Questão
interface Questao {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  author: string;
  creationDate: string;
  category: string;
  status: string;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  questions: any[];
  children: Subject[];
}

const DADOS_MOCK: Questao[] = [
  {
    id: 1,
    title: "Questão 1",
    description: "Descrição 1",
    difficulty: "Fácil",
    author: "Autor 1",
    creationDate: "2023-10-01",
    category: "Matemática",
    status: "Ativa",
  },
  {
    id: 2,
    title: "Questão 2",
    description: "Descrição 2",
    difficulty: "Médio",
    author: "Autor 2",
    creationDate: "2023-10-02",
    category: "Português",
    status: "Inativa",
  },
];

export const Questoes: React.FC = () => {
  const [questoes, setQuestoes] = useState<Questao[]>(DADOS_MOCK);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalDeleteVisivel, setModalDeleteVisivel] = useState(false);
  const [questaoEditando] = useState<Questao | null>(null);
  const [questaoDeletando] = useState<Questao | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingAssuntos, setLoadingAssuntos] = useState(false);
  // Estado do modal de criar assunto
  const [modalAssuntoVisivel, setModalAssuntoVisivel] = useState(false);
  const [parentIdAssunto, setParentIdAssunto] = useState<string | null>(null);
  const [formAssunto] = Form.useForm();
  const [editandoAssunto, setEditandoAssunto] = useState<Subject | null>(null);
  const [loadingAssunto, setLoadingAssunto] = useState(false);

  // Abrir modal para editar
  // const abrirModalEditar = (questao: Questao) => {
  //   setQuestaoEditando(questao);
  //   form.setFieldsValue(questao);
  //   setModalVisivel(true);
  // };

  // Salvar (criar ou editar)
  const onSalvar = (values: any) => {
    if (questaoEditando) {
      setQuestoes((prev) =>
        prev.map((q) =>
          q.id === questaoEditando.id ? { ...q, title: values.title } : q
        )
      );
      message.success("Questão editada com sucesso!");
    } else {
      const nova: Questao = {
        id: Math.max(...questoes.map((q) => q.id), 0) + 1,
        title: values.title,
        description: values.description,
        difficulty: values.difficulty,
        author: values.author,
        creationDate: values.creationDate,
        category: values.category,
        status: values.status,
      };
      setQuestoes((prev) => [...prev, nova]);
      message.success("Questão cadastrada com sucesso!");
    }
    setModalVisivel(false);
  };

  // Abrir modal de confirmação de delete
  // const abrirModalDelete = (questao: Questao) => {
  //   setQuestaoDeletando(questao);
  //   setModalDeleteVisivel(true);
  // };

  // Confirmar delete
  const confirmarDelete = () => {
    if (questaoDeletando) {
      setQuestoes((prev) => prev.filter((q) => q.id !== questaoDeletando.id));
      message.success("Questão deletada com sucesso!");
    }
    setModalDeleteVisivel(false);
  };

  // Buscar subjects da API
  const fetchSubjects = async () => {
    setLoadingAssuntos(true);
    try {
      const data = await api.get("/subjects");
      setSubjects(data.data || data); // caso a API retorne { data: [...] }
    } catch (e) {
      setSubjects([]);
    } finally {
      setLoadingAssuntos(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handlers para modal de assunto
  const abrirModalCriarAssunto = (parentId: string | null = null) => {
    setParentIdAssunto(parentId);
    setEditandoAssunto(null);
    setModalAssuntoVisivel(true);
    formAssunto.resetFields();
  };
  const abrirModalEditarAssunto = (subject: Subject) => {
    setEditandoAssunto(subject);
    setModalAssuntoVisivel(true);
    formAssunto.setFieldsValue({
      name: subject.name,
      description: subject.description,
    });
  };
  const fecharModalAssunto = () => {
    setModalAssuntoVisivel(false);
    setParentIdAssunto(null);
    setEditandoAssunto(null);
    formAssunto.resetFields();
  };

  const onFinishAssunto = async (values: any) => {
    setLoadingAssunto(true);
    try {
      if (editandoAssunto) {
        // Editar
        await api.patch(`/subjects/${editandoAssunto.id}`, {
          name: values.name,
          description: values.description,
        });
        message.success("Assunto editado com sucesso!");
      } else {
        // Criar
        await api.post("/subjects", {
          name: values.name,
          description: values.description,
          parentId: parentIdAssunto,
        });
        message.success("Assunto cadastrado com sucesso!");
      }
      fecharModalAssunto();
      fetchSubjects();
    } catch (e) {
      message.error("Erro ao salvar assunto");
    } finally {
      setLoadingAssunto(false);
    }
  };

  function renderSubjectTree(subject: Subject) {
    return (
      <FileTree.Folder
        key={subject.id}
        name={subject.name}
        onCreateSubject={() => abrirModalCriarAssunto(subject.id)}
        onEditSubject={() => abrirModalEditarAssunto(subject)}
        onCreateQuestion={() => navigate(`/questoes/${subject.id}/criar`)}
        subjectData={subject}
      >
        {subject.children && subject.children.length > 0
          ? subject.children.map((child) => renderSubjectTree(child))
          : null}
      </FileTree.Folder>
    );
  }

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
          <h2 style={{ margin: 0 }}>Questões</h2>
          <p style={{ margin: 0, color: "#666" }}>
            Gerencie todas as suas questões em um só lugar
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
          label="Questões Totais"
          labelColor="#6a7282"
          value="200"
          valueColor="#000"
          trend="up"
          percent={10}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
        <Card
          icon={<span>🔍</span>}
          bg="#fff1f0"
          label="Questão Menos Vista"
          labelColor="#6a7282"
          value="Questão 5"
          valueColor="#000"
          trend="down"
          percent={3}
          subtitle="em relação ao mês passado"
          trendColor="#f5222d"
        />
        <Card
          icon={<span>📈</span>}
          bg="#f6ffed"
          label="Questão Mais Vista"
          labelColor="#6a7282"
          value="Questão 1"
          valueColor="#000"
          trend="up"
          percent={25}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
        <Card
          icon={<span>🆕</span>}
          bg="#e6f7ff"
          label="Questões Recentes"
          labelColor="#6a7282"
          value="10"
          valueColor="#000"
          trend="up"
          percent={8}
          subtitle="em relação ao mês passado"
          trendColor="#52c41a"
        />
        <Card
          icon={<span>💪</span>}
          bg="#fffbe6"
          label="Questão Mais Difícil"
          labelColor="#6a7282"
          value="Questão 3"
          valueColor="#000"
          trend="up"
          percent={30}
          subtitle="em relação ao mês passado"
          trendColor="#faad14"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          height: 500,
        }}
      >
        {/* Container da árvore de arquivos */}
        <div
          style={{
            width: "308px",
            background: "#fff",
            borderRadius: 10,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            minWidth: 220,
            maxHeight: "100%",
            overflowY: "auto",
            border: "1px solid #e0e0e0",
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontWeight: 600, fontSize: 18 }}>
            Catalogo de Questões
          </h3>
          {loadingAssuntos ? (
            <Spin />
          ) : subjects.length === 0 ? (
            <Empty
              description="Nenhum assunto cadastrado"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => abrirModalCriarAssunto(null)}
              >
                Cadastrar Assunto
              </Button>
            </Empty>
          ) : (
            <FileTree.Root>
              {subjects.map((subject) => renderSubjectTree(subject))}
            </FileTree.Root>
          )}
        </div>
        {/* Container de exibição */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 22 }}>
            Questão 3.txt
          </h2>
          <div
            style={{
              background: "#f6f8fa",
              borderRadius: 6,
              padding: 16,
              marginTop: 16,
              fontFamily: "monospace",
              fontSize: 16,
              color: "#222",
              whiteSpace: "pre-line",
            }}
          >
            Esta é considerada a questão mais difícil. O conteúdo aborda
            integrais e derivadas complexas.
          </div>
        </div>
      </div>

      {/* Modal de criar/editar */}
      <Modal
        title={questaoEditando ? "Editar Questão" : "Cadastrar Questão"}
        open={modalVisivel}
        onCancel={() => setModalVisivel(false)}
        onOk={() => form.submit()}
        okText={questaoEditando ? "Salvar" : "Cadastrar"}
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" onFinish={onSalvar}>
          <Form.Item
            name="title"
            label="Título da Questão"
            rules={[{ required: true, message: "Digite o título da questão" }]}
          >
            <Input placeholder="Ex: Questão 1" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              { required: true, message: "Digite a descrição da questão" },
            ]}
          >
            <Input placeholder="Ex: Descrição da questão" />
          </Form.Item>
          <Form.Item
            name="difficulty"
            label="Dificuldade"
            rules={[
              { required: true, message: "Selecione a dificuldade da questão" },
            ]}
          >
            <Input placeholder="Ex: Fácil, Médio, Difícil" />
          </Form.Item>
          <Form.Item
            name="author"
            label="Autor"
            rules={[{ required: true, message: "Digite o autor da questão" }]}
          >
            <Input placeholder="Ex: Autor 1" />
          </Form.Item>
          <Form.Item
            name="creationDate"
            label="Data de Criação"
            rules={[
              {
                required: true,
                message: "Digite a data de criação da questão",
              },
            ]}
          >
            <Input placeholder="Ex: 2023-10-01" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Categoria"
            rules={[
              { required: true, message: "Digite a categoria da questão" },
            ]}
          >
            <Input placeholder="Ex: Matemática, Português" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: "Selecione o status da questão" },
            ]}
          >
            <Input placeholder="Ex: Ativa, Inativa" />
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
        Tem certeza que deseja deletar a questão "{questaoDeletando?.title}"?
      </Modal>

      {/* Modal de criar/editar assunto */}
      <SubjectModal
        visible={modalAssuntoVisivel}
        onClose={fecharModalAssunto}
        onSubmit={onFinishAssunto}
        initialValues={
          editandoAssunto
            ? {
                name: editandoAssunto.name,
                description: editandoAssunto.description,
              }
            : undefined
        }
        parentId={parentIdAssunto}
        loading={loadingAssunto}
        modoEdicao={!!editandoAssunto}
      />
    </div>
  );
};
