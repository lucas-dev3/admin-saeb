import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Select, Switch, Row, Col, Button } from "antd";
import { styled } from "styled-components";
import Alternativas from "./Alternativas";

const EditorComponent = styled(Editor)`
  .tox-statusbar {
    display: none !important;
  }
`;

export const Questao: React.FC = () => {
  const [, setCurrentConteudo] = useState("");
  const [isAtiva, setIsAtiva] = useState(false);
  const [tipo, setTipo] = useState("objetiva");

  // Definir valores fixos para `assuntos`
  const assuntos = ["Matemática", "Português", "Ciências"];

  return (
    <Form layout="vertical" style={{ width: "100%" }}>
      <h2>Cadastro de Questão</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Assuntos">
            <Select size="large" value={assuntos[0]}>
              {assuntos.map((assunto, index) => (
                <Select.Option key={index} value={assunto}>
                  {assunto}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Título">
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Tipo">
            <Select size="large" value={tipo} onChange={setTipo}>
              <Select.Option value="objetiva">Objetiva</Select.Option>
              <Select.Option value="discusiva">Discusiva</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Dificuldade">
            <Input size="large" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Ativa">
            <Switch checked={isAtiva} onChange={() => setIsAtiva(!isAtiva)} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Conteúdo">
        <EditorComponent
          apiKey="jj148sughvuqwlftlb4ung4hi6dvtpk2uj0cofklyn781n7o"
          init={{
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={(content: any) => setCurrentConteudo(content)}
        />
      </Form.Item>
      {tipo === "objetiva" && <Alternativas quantidadePadrao={4} />}
      <Button type="primary" size="large" style={{ width: "100%" }}>Salvar</Button>
    </Form>
  );
};
